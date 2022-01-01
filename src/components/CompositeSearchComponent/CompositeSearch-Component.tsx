import React, { useState } from "react";

import { Box, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

import SearchField from "../SearchFieldComponent/SearchField-Component";

interface ComponentProps {
    emitFn: CallableFunction;
}

function CompositeSearch(props: ComponentProps) {
    const [method, setMethod] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const sortParams = [
        { value: "popular", display: "Popular" },
        { value: "starred", display: "Starred" },
        { value: "search", display: "Search" },
        { value: "new", display: "Recent" },
        { value: "old", display: "Oldest" }
    ];

    function handleMethodChange(ev: any) {
        if (ev.target.value === "search") {
            setIsSearch(true);
            props.emitFn("search", true, undefined);
        }
        else {
            setIsSearch(false);
            props.emitFn(ev.target.value, false);
        }
        setMethod(ev.target.value);
    }

    function handleSearchChange(inputSearchTerm: string) {
        props.emitFn("search", true, inputSearchTerm);;
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: isSearch ? "10px" : "0"
                }}>
                    <Box sx={{
                        width: 120,
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="composite-search-label">Sort By</InputLabel>
                            <Select
                                labelId="composite-search-label"
                                id="composite-search"
                                value={method}
                                label="Sort By"
                                onChange={handleMethodChange}>
                                {
                                    sortParams.map(param => (
                                        <MenuItem
                                            key={param.value}
                                            value={param.value}>

                                            {param.display}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {
                    isSearch && (
                        <Grid item xs={12}>
                            <Box sx={{
                                width: "100%",
                                height: "70px",
                                bgcolor: "red"
                            }}>
                                <SearchField emitFn={handleSearchChange} />
                            </Box>
                        </Grid>
                    )
                }

            </Grid>
        </React.Fragment>
    );
}

export default CompositeSearch;
