import React from "react";

import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";


interface ComponentProps {
    emitActions: CallableFunction;
}


function EditorActionBar(props: ComponentProps) {
    function handleActions(action: "save" | "cancel") {
        props.emitActions(action);
    }

    return (
        <Box sx={{
            width: "100%",
            height: "85px",
            bgcolor: "#1c1c1c",
            padding: "10px"
        }}
            display="flex" alignItems="center">

            <Button sx={{
                bgcolor: "#aa42f5",
                width: "120px",
                height: "50px",
                fontSize: 25
            }}
                variant="contained"
                onClick={() => {
                    handleActions("save");
                }}
                endIcon={
                    <SaveIcon sx={{
                        color: "white",
                        width: "25px",
                        height: "25px"
                    }} />
                }>
                Save
            </Button>

            <Button sx={{
                bgcolor: "#aa42f5",
                width: "150px",
                height: "50px",
                fontSize: 25,
                marginLeft: "20px"

            }}
                variant="contained"
                onClick={() => {
                    handleActions("cancel");
                }}
                endIcon={
                    <SaveIcon sx={{
                        color: "white",
                        width: "25px",
                        height: "25px"
                    }} />
                }>
                Cancel
            </Button>
        </Box>
    );
}

export default EditorActionBar;
