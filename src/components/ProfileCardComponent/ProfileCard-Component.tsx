import React from "react";
import { useSelector } from "react-redux";

import { Box, Typography, Divider } from "@mui/material";

function ProfileCard(props) {
    const userName: string = useSelector((state: any) => state.user.currentUser.userName);


    return (
        <React.Fragment>
            <Box sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#2F4F4F"
            }}>

                <Box display="flex" alignItems="center" sx={{
                    position: "relative",
                    width: "100%",
                    height: "75px",
                    backgroundColor: "#1c1c1c",
                    top: "0px",
                    paddingLeft: "10px",
                    color: "white"
                }}>
                    <Typography variant="h4">
                        hello, {userName}
                    </Typography>
                </Box>
                 
                <Divider variant="middle"/>

                <Box display="flex" alignItems="center" sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100px",
                    backgroundColor: "#1c1c1c",
                    right: "0px",
                    paddingLeft: "10px",
                    color: "white"
                }}>
                    <Typography variant="h4">
                        you have {props.likeNumber} likes on {props.projectNumber} {
                            props.projectNumber > 1 ? "projects" : "project"
                        }
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ProfileCard;
