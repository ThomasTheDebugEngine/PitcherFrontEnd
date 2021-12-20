import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

import NavBar from "../../components/NavBarComponent/NavBar-Component";
import ExpandActionBar from "../../components/ExpandActionBarComponent/ExpandActionBar-Component";

function ExpandPage() {
    const [title, setTitle] = useState("");
    const [desctiption, setDesctiption] = useState("");
    const [body, setBody] = useState("");
    const location = useLocation();
    const [projectId, setProjectId] = useState("");

    const userId = useSelector((state: any) => state.user.currentUser.id);

    useEffect(() => {
        setTitle(location.state.project.title);
        setDesctiption(location.state.project.description);
        setBody(location.state.project.body);
        setProjectId(location.state.project.projectId);
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <NavBar isWithDrawer isWithArrow backArrowPath="profile" />

            <Box sx={{
                width: "100%",
                height: "100px",
                bgcolor: "#474747"
            }}>
                <ExpandActionBar userId={userId} projectId={projectId} />
            </Box>

            <Box sx={{
                height: "70px",
                bgcolor: "#1c1c1c",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                color: "white"
            }}>
                <Typography variant="h4">
                    viewing project
                </Typography>
            </Box>

            <Box sx={{
                width: "100%",
                height: "85px",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px"
            }}>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Box>

            <Box sx={{
                width: "100%",
                height: "calc(100vh - 76px)",
                bgcolor: "#1c1c1c"
            }}>
                <Box sx={{
                    width: "100%",
                    height: "250px",
                }}>
                    <Box sx={{
                        width: "100%",
                        height: "60px",
                        bgcolor: "#1c1c1c",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        color: "white"
                    }}>
                        <Typography variant="h4">
                            Description
                        </Typography>
                    </Box>

                    <Box sx={{
                        padding: "5px",
                        bgcolor: "white",
                        height: "100%"
                    }}>
                        <MDEditor.Markdown source={desctiption} />
                    </Box>
                </Box>

                <Box sx={{
                    width: "100%",
                    height: "250px",
                }}>
                    <Box sx={{
                        width: "100%",
                        height: "60px",
                        bgcolor: "#1c1c1c",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        color: "white"
                    }}>
                        <Typography variant="h4">
                            Body
                        </Typography>
                    </Box>

                    <Box sx={{
                        padding: "5px",
                        bgcolor: "white",
                        height: "100%"
                    }}>
                        <MDEditor.Markdown source={body} />
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ExpandPage;
