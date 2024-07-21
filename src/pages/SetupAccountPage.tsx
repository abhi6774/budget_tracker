import {
  Box,
  Button,
  createTheme,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BlurContainer from "../components/BlurContainer";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { saveUser, useAuth } from "../contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "rgb(65, 53, 202)" },
  },
});

export default function SetupAccountPage() {
  const [fullname, setFullname] = useState("");

	const {user, LoggedInGuard} = useAuth();

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (fullname === "") {
			alert("Enter username");
			return;
		}
		await saveUser({
			username: fullname,
			uid: user!.uid,
			email: user!.email!
		});
    LoggedInGuard!("setup");
	}


  useEffect(() => {
    console.log("Running Guard in setup account")
    LoggedInGuard!("setup");
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: "#14162E",
          overflow: "scroll",
        }}
      >
        <BlurContainer />
        <Stack
          sx={{
            maxWidth: "400px",
            position: {
              md: "static",
            },
            top: "0",
            alignItems: "center",
            marginY: { xs: 2, md: 4 },
            paddingY: {
              xs: 8,
              md: 4,
            },
            marginX: "auto",
            background: "rgba(255,255,255, 0.0)",
            backdropFilter: "blur(5px)",
            border: "1px solid #ffffff02",
            boxSizing: "border-box",
            borderRadius: {
              xs: 0,
              md: 4,
            },
            boxShadow: "0 0 12px 2px rgba(0,0,0, 0.2)",
            zIndex: "1",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            color="#fff"
          >
            MeetGaze
          </Typography>
          <Typography
            variant="body1"
            component="h1"
            fontWeight="bold"
            color="#fff"
            marginTop={"12px"}
          >
            Setup Account
          </Typography>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{
              width: "calc(100% - 20px)",
            }}
          >
            <Box sx={{ width: "100%", marginTop: "24px", color: "white" }}>
              <form
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}

								onSubmit={onSubmit}
              >
                <InputField
                  label="Enter Fullname: "
                  type="text"
                  onChange={(e) => setFullname(e.currentTarget.value)}
                  value={fullname}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "calc(100% - 60px)",
                    marginTop: "24px",
                    transition: "0.2s",
                    "&:active": {
                      scale: "0.95",
                    },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
                <Box height={"80px"} />
              </form>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
