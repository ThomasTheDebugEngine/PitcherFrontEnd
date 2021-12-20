import React from "react";

import { ButtonBase } from '@mui/material';
import { useNavigate } from "react-router-dom";

interface ComponentProps {
    displayName: string;
    action: string;
}

function GenericButton(props: ComponentProps) {
    const { displayName, action } = props;

    const navigate = useNavigate();

    function handleClick(actionType: string) {
        if (actionType === "profile") {
            navigate("/profile");
        }
        else if (actionType === "browse") {
            navigate("/browse");
        }
        else if (actionType === "register") {
            navigate("/register");
        }
    }

    return (
        <ButtonBase sx={{
            width: "100%",
            height: "60px",
            background: "#aa42f5",
            color: "white",
            fontSize: 25,
            letterSpacing: "3px",
            borderRadius: "10px",
            padding:"5px",

            ":hover": {
                bgcolor: "#c384f0"
            }
        }}
            onClick={() => { handleClick(action); }}>
            {displayName}
        </ButtonBase>
    );
}

export default GenericButton;
