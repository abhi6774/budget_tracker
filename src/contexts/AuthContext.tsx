import {
    createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, getDocs, setDoc, where, query } from "firebase/firestore";


type UserData = {
  email: string,
  username: string,
  uid: string
}

type TAuthContextObject = {
  user: User | null;
  loaded: AuthLoadStatus,
  IsLoggedIn: typeof IsLoggedIn;
  LoggedInGuard?: (pageID: TPageID) => void,
  userData: UserData | null
};

export enum AuthLoadStatus {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

export type TPageID = "signup" | "login" | "setup" | "other";


async function IsLoggedIn(): Promise<[User|null, UserData|null, any]> {
  try {
    const user = await new Promise<User | null>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
        unsubscribe();
      });
    });
    if (!user) {
      return [null, null, new Error("User not Found")];
    }
    const [userData, error] = await checkUserExists(user!.uid);
    if (!userData && error) {
      return [user, null, error]
    }
    return [user, userData, null]
  } catch (error) {
    return [null, null, error];
  }
}


const AuthContext = createContext<TAuthContextObject>({
  user: null,
  loaded: AuthLoadStatus.IDLE,
  IsLoggedIn,
  userData: null
});


export async function saveUser(user: UserData) {
  try {
    const userDoc = doc(firestore, `users/${user.uid}`);
    await setDoc(userDoc, {
      uid: user.uid,
      username: user.username,
      email: user.email
    })
  } catch (error) {
    console.log(error);
    alert("Couldn't save user");
  }
}

export async function checkUserExists(uid: string): Promise<[UserData|null, Error|null]> {
  try {
    const q = query(collection(firestore, "users"), where("uid", "==", uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [null, new Error("User data not available")];
    }
  
    const userData = snapshot.docs[0].data() as UserData;
    return [userData, null];
  } catch (error: any) {
    console.error("Error checking user existence: ", error);
    return [null, error];
  }
}

export async function authenticateWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, googleAuthProvider)
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("User signed in: ", user);
    }
  } catch (error) {
    console.error("Error handling redirect result: ", error);
    alert("Error handling redirect result: " + (error as any).message);
  }
}

export async function signupWithEmail(email: string, password: string) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCred);
}

export async function loginWithEmail(email:string, password: string) {
  console.log("Login Button Press")
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  console.log(userCred);
  return userCred;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<AuthLoadStatus>(AuthLoadStatus.IDLE);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();


  function LoggedInGuard(pageID: TPageID) {
    console.log("Checking logged in status")
    setLoaded(AuthLoadStatus.LOADING);
    IsLoggedIn().then(async ([user, userData, err]) => {
      console.assert(!err, err);
      console.assert(user, "User not loggedin");
      console.assert(userData, "Userdata not found");
      console.log(user, userData)

      if (err) {
        setLoaded(AuthLoadStatus.ERROR);
      }

      if (!user && pageID === "signup" || pageID === "login") {
        setLoaded(AuthLoadStatus.IDLE);
        return;
      } else if (!user) {
        navigate("/signup");
        return;
      }
      setCurrentUser(user);
      
      if (!userData && pageID === "setup") {
        setLoaded(AuthLoadStatus.IDLE);
        return;
      } else {
        navigate("/");
      }
      setUserData(userData);
      setLoaded(AuthLoadStatus.SUCCESS);
    });
  }

  useEffect(() => {
    console.log(location);
    onAuthStateChanged(auth, (user) => console.log(user))
  }, [location])

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loaded,
        IsLoggedIn,
        userData,
        LoggedInGuard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
