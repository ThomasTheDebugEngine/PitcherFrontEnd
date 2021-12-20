import React, { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { createTheme, Box, Typography } from "@mui/material";

const theme = createTheme();

const localStyles = {
    MdeParent: {
        sx: {
            padding: "10px",

            [theme.breakpoints.down(405)]: {
                width: "405px",
            },

            [theme.breakpoints.up(430)]: {
                width: "100%",
            }
        }
    },

    scrollStyles: {
        sx: {
            width: "100%",
            height: "400px",
            bgcolor: "#1c1c1c",
            paddingTop: "10px",
            borderTop: "3px solid #696969",

            [theme.breakpoints.down(405)]: {
                overflowX: "scroll",
                overflowY: "hidden"
            },

            [theme.breakpoints.up(430)]: {
                overflowX: "hidden"
            }
        }
    }
};

interface ComponentProps {
    editorType: "Description" | "Body",
    emitFn: CallableFunction,
    defaultState: string;
}

function MarkDownEditor(props: ComponentProps) {
    const { emitFn, editorType, defaultState } = props;

    const [state, setState] = useState(defaultState);
    const adapterState = defaultState; // for some reason the MDEditor doesn't like state directly passed

    useEffect(() => {
        setState(defaultState);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        emitFn(editorType, state);
    }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

    function handleInput(input: string | undefined) {

        if (input) {
            setState(input);
        }
        else {
            setState("");
        }
    }

    return (
        <Box {...localStyles.scrollStyles}>

            <Typography variant="h5"
                sx={{
                    marginLeft: "10px",
                    marginBottom: "10px",
                    color: "white"
                }}>
                {"Project " + editorType}
            </Typography>

            <Box {...localStyles.MdeParent} >
                <MDEditor
                    height={300}
                    value={adapterState}
                    onChange={handleInput} />
            </Box>
        </Box>
    );
}

export default MarkDownEditor;
