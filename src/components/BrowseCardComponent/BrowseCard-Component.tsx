import React from "react";

import { Box, Typography } from "@mui/material";

import { project } from "../../redux/project/projectTypes";


interface ComponentProps {
    project: project;

}

//box-shadow: 0 0 16px rgba($color: #FFFFFF, $alpha: 0.2);
//background-color: rgba($color: #98ffff, $alpha: 0.30);
//backdrop-filter: blur(5px);
//border-radius: 5px;

function BrowseCard(props: ComponentProps) {
    const { createdAtUnix, title } = props.project;

    const date = new Date(createdAtUnix * 1000).toString().substring(0, 24);

    return (
        <Box sx={{
            width: "100%",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "35px",
        }}>

            <Box sx={{
                width: "100%",
                height: "100px",
                bgcolor: "rgba(184, 184, 184, 0.9)",
                display: "flex",
                alignItems: "center",
                padding: "10px"
            }}>
                <Typography variant="h4">
                    {title}
                </Typography>
            </Box>

            <Box sx={{
                width: "100%",
                height: "50px",
                bgcolor: "rgba(184, 184, 184, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 20px"
            }}>
                <Typography variant="body1">
                    created at - {date}
                </Typography>
            </Box>
        </Box>
    );
}

export default BrowseCard;
