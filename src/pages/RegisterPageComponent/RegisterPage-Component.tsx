import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container, Grid, Typography, Button, Box } from "@mui/material";

import { purgeUserData, setLoginUserAction } from "../../redux/auth/authActions";
import { attemptSignup } from "../../redux/auth/authUtils";

import UserInput from "../../components/UserInputComponent/UserInput-Component";
import DrawerAddon from "../../components/DrawerAddonComponent/DrawerAddon-Component";

function RegisterPage() {
    const [state, setState] = useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        redirect: false
    });
    
    const dispatch = useDispatch();
    
    function handleInput(ev) {
        setState({
            ...state,
            [ev.target.name]: ev.target.value,
        });
    };

    async function handleRegisterClick() { //TODO handle empty and stuff locally
        const { email, userName, password, confirmPassword } = state;

        const response = await attemptSignup({
            Email: email,
            UserName: userName,
            Password: password,
            ConfirmPassword: confirmPassword
        });

        if (response?.data) {
            dispatch(setLoginUserAction(response.data));
            
            setState({
                ...state,
                redirect: true
            });
        }
        else {
            dispatch(purgeUserData());
        }
    }
    
    if (state.redirect) {
        return <Navigate to="/profile" />;
    }
    
    return (
        <Container disableGutters sx={{
            width: "100%",
            height: "100%",
            bgcolor: "black",
            paddingBottom: "10px"
        }}>

            <Container sx={{
                padding: "10px 20px",
                height: "100px",
                width: "100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
            }}>
                <Typography variant="h2" color="white">
                    Register
                </Typography>

                <Box>
                    <DrawerAddon/>
                </Box>
            </Container>

            <Grid container sx={{
                marginTop: "10px",
                height: "max-content",
                padding: "5px 5px"
            }}>

                <Grid item xs={12}>
                    <UserInput typeText="email" emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "50px" }}>
                    <UserInput typeText="userName" emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "50px" }}>
                    <UserInput typeText="password" isCensored emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "50px" }}>
                    <UserInput typeText="confirmPassword" isCensored emitInput={handleInput} />
                </Grid>

                <Grid item xs={12} sx={{
                    marginTop: "50px"
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
                        onClick={handleRegisterClick}>
                        <Typography variant="button" sx={{ fontSize: 35 }}>
                            Register
                        </Typography>
                    </Button>

                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="h6" sx={{ color: "white" }}>
                        already have an account ?

                        <Link to="/login" style={{
                            marginLeft: "5px",
                            textDecoration: "none",
                            color: "#d11dc8"
                        }}>
                            sign in
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegisterPage;
