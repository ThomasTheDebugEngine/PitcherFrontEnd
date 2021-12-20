import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


function ProjectActionBar() {
    const navigate = useNavigate();

    function handleAddButton() {
        navigate("/editor");
    }

    return (
        <Box sx={{
            position: "absolute",
            width: "80px",
            height: "80px",
            right: "0px",
            bgcolor: "#878787",
            justifySelf: "flex-end",
            marginRight: "20px",
            borderRadius: "50%",
        }}>
            <IconButton sx={{
                width: "100%",
                height: "100%"
            }}
                onClick={handleAddButton}>

                <AddIcon sx={{
                    fontSize: 60,
                    color: "white"
                }} />
            </IconButton>
        </Box>
    );
}

export default ProjectActionBar;
