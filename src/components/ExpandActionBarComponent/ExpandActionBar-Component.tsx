import React from "react";
import { useDispatch } from "react-redux";

import { Box, Stack, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';

import { likeProject, starProject } from "../../redux/project/projectUtils"
import { updateProjectAction, setUserStarredProjectsAction } from "../../redux/project/projectActions"


interface ComponentProps {
    userId: string
    projectId: string
}

function ExpandActionBar(props: ComponentProps) {
    const {userId, projectId} = props;
    const dispatch = useDispatch();
    async function handleLikeClick() {
        const response = await likeProject(userId, projectId);

        if(response) {
            dispatch(updateProjectAction(projectId, response))
        }
    }

    async function handleFavClick() {
        const response = await starProject(userId, projectId);

        if(response) {
            dispatch(setUserStarredProjectsAction(response));
        }
        console.log(`userID: ${props.userId} | projectID: ${props.projectId}`);
    }

    return (
        <React.Fragment>
            <Box sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#474747",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px"
            }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={
                        <FavoriteIcon sx={{
                            fontSize: 40,
                            color: "red"
                        }} />}
                        onClick={handleLikeClick}>
                        like
                    </Button>

                    <Button variant="contained" endIcon={
                        <GradeIcon sx={{
                            fontSize: 40,
                            color: "gold"
                        }} />}
                    onClick={handleFavClick}>
                        favourite
                    </Button>
                </Stack>
            </Box>
        </React.Fragment>
    );
}

export default ExpandActionBar;
