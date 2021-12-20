import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { purgeUserData } from "../../redux/auth/authActions";
import { purgeProjectData } from "../../redux/project/projectActions";

import { SwipeableDrawer, Avatar, IconButton, Divider } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { stringAvatar, logout } from "../../redux/auth/authUtils";

function DrawerAddon() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const stateUserName = useSelector((state: any) => state.user.currentUser?.userName);
    const userStatus = useSelector((state: any) => state.user.loginStatus);

    useEffect(() => {
        if (!userName) {
            setUserName("anonymous");
        }
        else {
            setUserName(stateUserName);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const loginOption = { name: "login", image: <LoginIcon sx={{ fontSize: 40, color: "black" }} /> };
    const logoutOption = { name: "logout", image: <LogoutIcon sx={{ fontSize: 40, color: "black" }} /> };

    const buttons: any[] = [
        { name: "home", image: <HomeIcon sx={{ fontSize: 40, color: "black" }} /> },
        { name: "profile", image: <Avatar {...stringAvatar(userName)} /> },
        { name: "browse", image: <TravelExploreIcon sx={{ fontSize: 40, color: "black" }} /> },

        userStatus ? logoutOption : loginOption
    ];



    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    function toggleDrawer(event: React.KeyboardEvent | React.BaseSyntheticEvent) {
        setIsOpen(!isOpen);
    }

    async function signOut() {
        const response = await logout();
        
        if (response) {
            dispatch(purgeUserData());
            dispatch(purgeProjectData());
        }
    }

    function handleButtonClicks(navPath: string) {

        if (`/${navPath}` === location.pathname) {
            setIsOpen(false);
        }
        else if (navPath === "home") {
            navigate("/");
        }
        else if (navPath === "logout") {
            signOut();
            navigate("/");
        }
        else {
            navigate(`/${navPath}`);
        }
    }

    // home, profile, browse
    return (
        <React.Fragment>
            <IconButton sx={{
                bgcolor: "#424242",
                width: "60px",
                height: "60px",
                marginRight: "15px"
            }}
                onClick={toggleDrawer}>
                <MenuIcon sx={{ fontSize: 40, color: "white" }} />
            </IconButton>

            <SwipeableDrawer PaperProps={{
                sx: {
                    bgcolor: "#8f8f8f"
                }
            }}
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}>

                <List sx={{
                    width: "250px",
                    marginTop: "30px"
                }}>

                    {
                        buttons.map(button => (
                            <React.Fragment key={button.name}>
                                <ListItem sx={{
                                    height: "70px",
                                    bgcolor: "#d4d4d4"
                                }}
                                    disablePadding>
                                    <ListItemButton onClick={() => { handleButtonClicks(button.name); }}>
                                        <ListItemIcon sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "40px",
                                            height: "56px"
                                        }}>
                                            {button.image}
                                        </ListItemIcon>

                                        <ListItemText sx={{
                                            marginLeft: "10px"
                                        }}>
                                            {button.name}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <Divider />

                            </React.Fragment>
                        ))
                    }
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    );
}

export default DrawerAddon;
