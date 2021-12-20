import React, { useRef, useState } from "react";

import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import "./SearchField-animations.scss";

interface ComponentProps {
    isWithIcon: boolean;
    emitFn?: CallableFunction;
}

function SearchField(props: ComponentProps) {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");

    function handleSearch() {
        //TODO if found, clear, else don't clear
        return; //TODO make a search route or pattern it
    }
    function handleChange(event: any) {
        setInput(event.target.value);

        if(props.emitFn !== undefined) {
            props.emitFn(event.target.value);
        }
    }

    return (
        <React.Fragment>
            <Box display="flex" justifyContent="flex-end" sx={{
                width: "100%",
                height: "100%",
            }}>
                <InputBase
                    ref={inputRef}
                    placeholder="your projects"
                    onChange={handleChange}
                    value={input}
                    sx={{
                        backgroundColor: "yellow",
                        width: "100%",
                        height: "100%",
                        color: "black",
                        padding: "10px",
                        fontSize: 25
                    }} />


                {
                    props.isWithIcon && (
                        <Box sx={{
                            width: "75px",
                            height: "100%",
                            backgroundColor: "orange",
                            right: "0px"
                        }}>
                            <IconButton onClick={handleSearch} sx={{
                                width: "100%",
                                height: "100%",
                                padding: "0"
                            }}>
                                <SearchIcon sx={{ fontSize: 60, color: "black" }} />
                            </IconButton>
                        </Box>
                    )
                }
            </Box>
        </React.Fragment>
    );
}

export default SearchField;
