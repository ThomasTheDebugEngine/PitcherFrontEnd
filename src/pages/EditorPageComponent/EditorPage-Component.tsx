import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, InputBase } from "@mui/material";
import { addProject, updateProjectByProjectId } from "../../redux/project/projectUtils";
import { appendNewProjectAction, updateProjectAction } from "../../redux/project/projectActions";

import MarkDownEditor from "../../components/MarkDownEditorComponent/MarkDownEditor-Component";
import EditorActionBar from "../../components/EditorActionBarComponent/EditorActionBar-Component";
import NavBar from "../../components/NavBarComponent/NavBar-Component";

export interface ProjectState {
    Title: string,
    Description: string,
    Body: string,
    OwnerId: string;
    ProjectId: string;
}

function EditorPage() {
    //TODO after that come back to profile page

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState<ProjectState>({
        Title: "",
        Description: "",
        Body: "",
        OwnerId: "",
        ProjectId: ""
    });

    const [defaultState, setDefaultState] = useState<ProjectState>({ //this enables the discarding of changes
        Title: "",
        Description: "",
        Body: "",
        OwnerId: "",
        ProjectId: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const userId = useSelector((state: any) => state.user.currentUser.id);

    useEffect(() => {
        if (location.state) {
            const { title, description, body, ownerId, projectId } = location.state.project;

            setDefaultState({
                Title: title,
                Description: description,
                Body: body,
                OwnerId: ownerId,
                ProjectId: projectId
            });

            setState({
                Title: title,
                Description: description,
                Body: body,
                OwnerId: ownerId,
                ProjectId: projectId
            });

            setIsEditing(true);
        }
        else {
            setState({
                Title: "",
                Description: "",
                Body: "",
                OwnerId: userId,
                ProjectId: ""
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    function handleEdits(target: string, value: string) {
        setState({
            ...state,
            [target]: value
        });
    }

    async function handleActions(action) {
        if (action === "save") {
            if (isEditing) {
                const response = await updateProjectByProjectId(state.ProjectId, state);

                if (response) {
                    // console.log("ypu", response);
                    //TODO change the state project
                    
                    dispatch(updateProjectAction(state.ProjectId, response));
                    // navigate("/profile");
                }
            }
            else {
                const response = await addProject(state);
                
                if(response) {
                    dispatch(appendNewProjectAction(response));
                    navigate("/profile");
                }
            }
        }
        else if (action === "cancel") {
            //TODO need an "are you sure"
            setState(defaultState);
        }
    }

    return (
        <React.Fragment>
            <NavBar isWithAvatar isWithArrow backArrowPath="profile" />

            <Box sx={{
                width: "100%",
                height: "100px",
                bgcolor: "#b8b8b8",
                padding: "10px"
            }}
                display="flex" alignItems="center">

                <InputBase sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "#1c1c1c",
                    color: "white",
                    fontSize: 35,
                    padding: "0 10px"
                }}
                    placeholder="Project Title"
                    value={state.Title}
                    onChange={(event) => {
                        setState({
                            ...state,
                            [event.target.name]: event.target.value
                        });
                    }}
                    name="Title" />
            </Box>

            <Box>
                <EditorActionBar emitActions={handleActions} />
            </Box>

            <MarkDownEditor
                editorType="Description"
                emitFn={handleEdits}
                defaultState={state.Description} />

            <MarkDownEditor
                editorType="Body"
                emitFn={handleEdits}
                defaultState={state.Body} />
        </React.Fragment>
    );
}

export default EditorPage;
