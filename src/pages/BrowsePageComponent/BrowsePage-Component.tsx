import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { getPopularProjects, sortProjectsByParam } from "../../redux/project/projectUtils";
import { project } from "../../redux/project/projectTypes";

import NavBar from "../../components/NavBarComponent/NavBar-Component";
import BrowseCard from "../../components/BrowseCardComponent/BrowseCard-Component";
import CompositeSearch from "../../components/CompositeSearchComponent/CompositeSearch-Component";

import bgGrid from "../../assets/poly1.svg";

function BrowsePage() {
    const [remoteProjectArr, setRemoteProjectArr] = useState<project[]>([]); //this is to save a server trip
    const [projectArr, setProjectArr] = useState<project[]>([]);

    const [isSearchEnabled, setIsSearchEnabled] = useState<boolean | undefined>(false);
    const [dynamicHeight, setDynamicHeight] = useState<"vh" | "%">("vh");

    const navigate = useNavigate();

    const starredProjects = useSelector((state: any) => state.project.starredProjects);

    useEffect(() => {
        getPopularProjects().then(response => {
            setRemoteProjectArr(response);
            setProjectArr(response);
        });
    }, []);

    useEffect(() => {
        projectArr.length > 2 ? setDynamicHeight("%") : setDynamicHeight("vh");
    }, [projectArr]);

    function handleExpandClick(projectId: string, project: project) {
        navigate(`/projects/${projectId}/view`, { state: { project } });
    }

    function handleEmittedEvents(filterParam: string, searchResize?: boolean, searchTerm?: string) {
        setIsSearchEnabled(searchResize);

        if (filterParam === "starred") {
            const staredArr = sortProjectsByParam(projectArr, filterParam, undefined, starredProjects);
            setProjectArr([...staredArr]);
        }
        else {
            const regularArr = sortProjectsByParam(remoteProjectArr, filterParam, searchTerm);
            setProjectArr([...regularArr]);
        }
    }

    return (
        <React.Fragment>
            <NavBar isWithDrawer isWithArrow backArrowPath="profile" />

            <Box sx={{
                width: "100%",
                height: "100px",
                bgcolor: "#1c1c1c",
                paddingLeft: "20px",
                color: "white"
            }}
                display="flex"
                alignItems="center">

                <Typography variant="h4">
                    Browse projects
                </Typography>
            </Box>

            <Box sx={{
                width: "100%",
                height: isSearchEnabled ? "150px" : "100px",
                display: "flex",
                padding: "10px",
            }}>
                <CompositeSearch emitFn={handleEmittedEvents} />
            </Box>

            <Box sx={{
                width: "100%",
                height: `calc(100${dynamicHeight} - 256px)`,
                backgroundImage: `url(${bgGrid})`,
                backgroundPosition: "center bottom",
                backgroundSize: "cover",
                backgroundRepeat: "repeat-y",
                padding: "20px 10px"
            }}>
                {
                    projectArr ?
                        projectArr.map(project => (
                            <Box onClick={() => {
                                handleExpandClick(project.projectId, project);
                            }}
                                key={project.projectId}>

                                <BrowseCard key={project.projectId} project={project} />
                            </Box>
                        ))
                        :
                        null
                }
            </Box>
        </React.Fragment>
    );
}

export default BrowsePage;
