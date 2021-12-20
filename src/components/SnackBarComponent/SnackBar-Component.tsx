import React, { useState } from "react";

import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


interface ComponentProps {
    openCondition: boolean;
}

function SnackBar(props: ComponentProps) {
    const [isOpen, setIsOpen] = useState(props.openCondition);

    function handleClose(event: React.BaseSyntheticEvent) {
        console.log("close");
        setIsOpen(false);
    }

    const action = (
        <React.Fragment>
            <IconButton onClick={handleClose}>
                <CloseIcon sx={{
                    fontSize: 30,
                    color: "white"
                }} />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={isOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Note archived"
                action={action}
            />
        </div>
    );
}

export default SnackBar;
