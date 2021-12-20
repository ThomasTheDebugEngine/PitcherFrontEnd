import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import { deleteProject } from "../../redux/project/projectUtils";
import { removeProject } from "../../redux/project/projectActions";

interface ComponentProps {
    project: {
        title: string,
        description: string,
        body: string,
        ownerId: string,
        projectId: string;
    };
}

function ProjectCard(props: ComponentProps) {
    const { project: { title }, project } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuIconStyles = {
        sx: {
            fontSize: 30,
            color: "white",
        }
    };

    const actions = [
        { icon: <EditIcon {...menuIconStyles} />, name: "edit" },
        { icon: <DeleteIcon {...menuIconStyles} />, name: "delete" }
    ];

    function toggleInlineMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    async function handleMuiltiClick(action: string) {
        if (action === "edit") {
            navigate("/editor", { state: { project } });
        }
        else if (action === "delete") { //TODO make an alert box later
            const response = await deleteProject(project.projectId);
            dispatch(removeProject(response));
        }
    }

    function handleExpandClick(projectId: string) {
        navigate(`/projects/${projectId}/view`, { state: { project } });
    }

    return (
        <Grid item>
            <Box sx={{
                width: "100%",
                height: "100px",
                backgroundColor: "#802eb8",
                paddingLeft: "10px",
                marginBottom: "10px",
                borderRadius: "5px",

                ":hover": {
                    bgcolor: "#b550fa"
                }
            }}
                display="flex"
                alignItems="center"
                justifyContent="space-between">

                {
                    isMenuOpen ?
                        null
                        :
                        <Box sx={{
                            width: "calc(100% - 100px)",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            color: "white"
                        }}
                            onClick={() => { handleExpandClick(project.projectId); }}>
                            <Typography variant="h4">
                                {title}
                            </Typography>
                        </Box>
                }

                <IconButton sx={{
                    position: "absolute",
                    width: "80px",
                    height: "80px",
                    right: "10px",
                    marginRight: "10px"
                }}
                    onClick={toggleInlineMenu}>
                    <SettingsIcon sx={{
                        fontSize: 40,
                        color: "white"
                    }} />
                </IconButton>

                {
                    isMenuOpen ?
                        <Box sx={{
                            width: "250px",
                            height: "100%",
                            paddingRight: "20px"
                        }}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end">
                            {
                                actions.map(action => (
                                    <IconButton sx={{
                                        bgcolor: "#454545",
                                        marginLeft: "10px",
                                        width: "50px",
                                        height: "50px"
                                    }}
                                        onClick={() => {
                                            handleMuiltiClick(action.name);
                                        }}

                                        key={action.name}>
                                        {
                                            action.icon
                                        }
                                    </IconButton>
                                ))
                            }
                        </Box>
                        :
                        null
                }
            </Box>
        </Grid>
    );
}

export default ProjectCard;