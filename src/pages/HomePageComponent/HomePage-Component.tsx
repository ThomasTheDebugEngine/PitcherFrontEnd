import React from "react";

import Fade from 'react-reveal/Fade';
import { Box, Typography } from "@mui/material";

import NavBar from "../../components/NavBarComponent/NavBar-Component";
import GenericButton from "../../components/GenericButtonComponent/GenericButton-Component";

import bgImage from '../../assets/homeBackground.jpg';

function HomePage() {
    return (
        <React.Fragment>
            <NavBar isWithDrawer />

            <Box sx={{
                width: "100%",
                height: "calc(100vh - 76px)",
                padding: "20px 0 0 0",
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: "center 20%"
            }}
                display="flex"
                flexDirection="column"
                alignItems="space-around"
                justifyContent="space-evenly">

                <Fade left duration={1000}>
                    <Box sx={{
                        color: "white",
                        marginLeft: "10px"
                    }}>
                        <Typography variant="h4">
                            Share your ideas
                        </Typography>
                    </Box>
                </Fade>

                <Fade left duration={1500}>
                    <Box sx={{
                        marginLeft: "50px",
                        color: "white"
                    }}>
                        <Typography variant="h4">
                            Share your projects
                        </Typography>
                    </Box>
                </Fade>

                <Fade left duration={2000}>
                    <Box sx={{
                        marginLeft: "100px",
                        color: "white"
                    }}>
                        <Typography variant="h4">
                            Find inspiration
                        </Typography>
                    </Box>
                </Fade>

                <Box sx={{
                    width: "100%",
                    height: "calc(100vh - 400px - 76px)",
                }}
                    display="flex"
                    flexDirection="column"
                    alignItems="space-around"
                    justifyContent="space-evenly">
                    <Box sx={{
                        width: "230px",
                        height: "60px",
                        marginLeft: "20px"
                    }}>
                        <Fade bottom>
                            <GenericButton displayName="Start building" action="profile" />
                        </Fade>
                    </Box>

                    <Box sx={{
                        width: "240px",
                        height: "60px",
                        marginRight: "30px"
                    }}
                        alignSelf="flex-end">
                        <Fade bottom delay={300}>
                            <GenericButton displayName="Browse Projects" action="browse" />
                        </Fade>
                    </Box>

                    <Box sx={{
                        width: "230px",
                        height: "60px",
                        marginLeft: "20px"
                    }}>
                        <Fade bottom delay={600}>
                            <GenericButton displayName="Sign up" action="register" />
                        </Fade>
                    </Box>
                </Box>
            </Box>

        </React.Fragment>
    );
}

export default HomePage;
