import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container, Grid, Typography, Button, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { attemptLogin } from "../../redux/auth/authUtils";
import { purgeUserData, setLoginUserAction } from "../../redux/auth/authActions";


import UserInput from "../../components/UserInputComponent/UserInput-Component";
import DrawerAddon from "../../components/DrawerAddonComponent/DrawerAddon-Component";

export default function LoginPage() {
    const [state, setState] = useState({
        email: "",
        password: "",
        redirect: false
    });
    const [loading, setLoading] = React.useState(false);
    const timer: any = React.useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    function handleInput(ev) {
        setState({
            ...state,
            [ev.target.name]: ev.target.value,
        });
    };

    async function handleLoginClick() { //TODO handle empty and stuff locally
        const { email, password } = state;

        if (!loading) {
            setLoading(true);

            const response = await attemptLogin({
                Email: email,
                Password: password
            });

            if (response?.data) {
                dispatch(setLoginUserAction(response.data));

                setState({
                    ...state,
                    redirect: true
                });
                
                timer.current = window.setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
            else {
                setLoading(false);
                dispatch(purgeUserData());
            }
        }
    };

    if (state.redirect) {
        return <Navigate to="/profile" />;
    }

    return (
        <Container disableGutters sx={{ width: "100%", height: "100vh", bgcolor: "black" }}>
            <Container sx={{
                padding: "10px 20px",
                height: "100px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant="h2" color="white">
                    Log in
                </Typography>

                <Box>
                    <DrawerAddon />
                </Box>
            </Container>

            <Grid container sx={{
                marginTop: "45px",
                height: "max-content",
                padding: "5px 5px"
            }}>

                <Grid item xs={12}>
                    <UserInput typeText="email" emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "50px" }}>
                    <UserInput typeText="password" isCensored emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{
                    marginTop: "70px"
                }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">

                    <Button variant="contained" sx={{
                        width: "90%",
                        height: "70px",
                        borderRadius: "20px",
                        background: "linear-gradient(to right, #b515dd, #d527a8);"
                    }}
                        onClick={async () => { await handleLoginClick(); }}>
                        {
                            loading ?
                                <CircularProgress
                                    size={35}
                                    thickness={5}

                                    sx={{
                                        position: 'absolute',
                                        color: "white",
                                    }} />
                                :
                                <Typography variant="button" sx={{ fontSize: 35 }}>
                                    Sign In
                                </Typography>

                        }
                    </Button>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="h6" sx={{ color: "#737373", marginTop: "20px" }}>
                        don't have an account ?
                        <Link to="/register" style={{
                            marginLeft: "5px",
                            textDecoration: "none",
                            color: "#d11dc8"
                        }}>
                            register
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
