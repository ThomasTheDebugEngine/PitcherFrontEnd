import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Avatar, IconButton } from "@mui/material";

import { stringAvatar } from "../../redux/auth/authUtils";

function AvatarAddon() {
    const navigate = useNavigate();

    const userName: string = useSelector((state: any) => state.user.currentUser.userName);

    function handleAvatarClick() {
        navigate("/profile");
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            bgcolor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
        }}>
            <IconButton sx={{
                margin: "0px 15px",
                width: "90px",
                height: "90px",
            }}
                onClick={handleAvatarClick}>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                }}>
                    <Avatar {...stringAvatar(userName)} />
                </Box>
            </IconButton>
        </Box>
    );
}

export default AvatarAddon;
