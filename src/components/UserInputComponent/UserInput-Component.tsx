import React, { useState } from "react";
import { InputBase, Container, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./UserInput-Styles.scss";

function UserInput(props: any) {

    const [visible, setVisible] = useState(false);
    function handleChange(ev: any) {
        props.emitInput(ev);
    }

    let displayString = `enter your ${props.typeText}`;

    if (props.typeText === "userName") {
        displayString = "enter your user name";
    }
    else if (props.typeText === "confirmPassword") {
        displayString = "confirm your password";
    }

    return (
        <Container disableGutters>
            <label htmlFor="userInputLabelRef">
                <Typography variant="h6" sx={{
                    color: "white",
                    marginLeft: "10px"
                }}>
                    {displayString}
                </Typography>
            </label>

            <div className="border-gardient">
                <InputBase sx={{
                    bgcolor: "#403939",
                    width: "100%",
                    height: "75px",
                    borderRadius: "20px",
                    color: "white",
                    padding: "5px 10px",
                    fontSize: 25
                }}
                    placeholder={`${displayString}`}
                    name={`${props.typeText}`}
                    onChange={handleChange}
                    type={
                        props.isCensored ?
                            visible ? "text" : "password"
                            :
                            "text"
                    }
                />
                {
                    props.isCensored ?
                        <IconButton sx={{
                            position: "absolute",
                            width: "50px",
                            height: "50px",
                            transform: "translate(-55px, 12px)"
                        }}
                            onClick={() => setVisible(!visible)}>
                            {
                                visible ?
                                    <VisibilityOffIcon sx={{
                                        color: "white",
                                        fontSize: 40
                                    }} />
                                    :
                                    <VisibilityIcon sx={{
                                        color: "white",
                                        fontSize: 40
                                    }} />
                            }
                        </IconButton>
                        :
                        null
                }
            </div>
        </Container>
    );
}

export default UserInput;
