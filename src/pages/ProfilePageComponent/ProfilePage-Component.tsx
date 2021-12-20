import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Box, Typography } from "@mui/material";
import { setProjectsOfUser, setUserStarredProjectsAction } from "../../redux/project/projectActions";
import { getUserAllProjectsByUserId, getStarredProjectsByUserId } from "../../redux/project/projectUtils";
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import ProfileCard from "../../components/ProfileCardComponent/ProfileCard-Component";
import Navbar from "../../components/NavBarComponent/NavBar-Component";
import ProjectCard from "../../components/ProjectCardComponent/ProjectCard-Component";
import ProjectActionBar from "../../components/ProjectActionBarComponent/ProjectActionBar-Component";
import bgSvg from "../../assets/wave1.svg";

function ProfilePage() {
    const [projectArr, setProjectArr] = useState<any[]>([]);
    const [likeNumber, setLikeNumber] = useState(0);
    const [projectNumber, setProjectNumber] = useState(0);

    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.user.currentUser.id);
    const projects = useSelector((state: any) => state.project.userProjects);

    useEffect(() => {
        getUserAllProjectsByUserId(userId).then((resp: any) => {
            if (resp) {
                setLikeNumber(
                    projectArr.reduce((acc: number, curr: any) => {
                        return acc + curr.likeNumber;
                    }, 0)
                );

                setProjectNumber(resp.length);
                dispatch(setProjectsOfUser(resp));
            }
        });

        getStarredProjectsByUserId(userId).then((resp: any) => {
            if(resp) {
                dispatch(setUserStarredProjectsAction(resp));
            }
        })

        setProjectArr(projects);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setProjectArr(projects);
    }, [projects]);

    return (
        <React.Fragment>
            <Container disableGutters sx={{ width: "100%", height: "250px" }}>
                <Box sx={{
                    width: "100%",
                    height: "50%",
                }}>
                    <Navbar isWithDrawer isWithArrow backArrowPath="/home" />
                </Box>

                <Box sx={{
                    position: ["relative"],
                    transform: ["translateY(-125px)"],
                    width: ["100%"],
                    height: ["calc(250px - 75px)", "50%"],
                    top: ["75px", "50%"],
                }}>
                    <ProfileCard likeNumber={likeNumber} projectNumber={projectNumber} />
                </Box>
            </Container>

            <Box display="flex" alignItems="center" justifyContent="flex-start"
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100px",
                    backgroundImage: `url(${bgSvg})`,
                    backgroundPosition: "center bottom",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    padding: "10px",
                    color: "white"
                }}>
                <Typography variant="h5">
                    Your Projects
                </Typography>

                <ProjectActionBar />
            </Box>

            <Container disableGutters sx={{
                width: "100%",
                height: "500px",
                background: "#1c1c1c",
                padding: "20px 10px"
            }}>
                <TransitionGroup>
                    {
                        // this doesn't work for some reason
                        <Fade left cascade>
                            <div>
                                {
                                    projectArr.map(project => (
                                        <ProjectCard key={project.projectId} project={project} />
                                    ))
                                }
                            </div>
                        </Fade>
                    }
                </TransitionGroup>
            </Container>
        </React.Fragment>
    );
}

export default ProfilePage;
