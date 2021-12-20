import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, IconButton, Divider } from "@mui/material";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

import SearchField from "../SearchFieldComponent/SearchField-Component";
import AvatarAddon from "../AvatarAddonComponent/AvatarAddon-Component";
import DrawerAddon from "../DrawerAddonComponent/DrawerAddon-Component";

interface ComponentProps {
    isWithSearch?: boolean;
    isWithAvatar?: boolean;
    isWithDrawer?: boolean;
    isWithArrow?: boolean;
    backArrowPath?: string;
}


function NavBar(props: ComponentProps) {
    const navigate = useNavigate();
    function handleBackArrowClick(pathAction: string | undefined) {
        if(pathAction) {
            navigate(`/${pathAction}`)
        }
    }

    return (
        <React.Fragment>
            <Grid container sx={{ width: "100%" }}>
                <Grid item xs={2}>
                    {
                        props.isWithArrow ?
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                bgcolor:"black",
                                position: "relative"
                            }}>
                                <IconButton sx={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                    onClick={() => { handleBackArrowClick(props.backArrowPath); }}>
                                    <ArrowBackIosOutlinedIcon sx={{ fontSize: 60, color: "white" }} />
                                </IconButton>
                            </Box>
                            :
                            <Box sx={{
                                width: "100%",
                                height: "76px",
                                bgcolor:"black",
                            }} />
                    }
                </Grid>

                <Grid item xs={10}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        bgcolor:"black",
                    }}>
                        {
                            props.isWithSearch && <SearchField isWithIcon/>
                        }

                        {
                            props.isWithAvatar && <AvatarAddon />
                        }

                        {
                            props.isWithDrawer && <DrawerAddon />
                        }

                    </Box>
                </Grid>
            </Grid>

            <Divider/>
        </React.Fragment>
    );
}

export default NavBar;
