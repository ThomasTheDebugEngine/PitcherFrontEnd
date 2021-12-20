import { isPayloadDefined } from "../generalUtils";
import { projectActionTypes } from "./projectTypes";
import { project } from "./projectTypes";

const initialState = {
    userProjects: [],
    starredProjects: []
};

export function projectReducer(currState = initialState, action) {
    switch (action.type) {
        case projectActionTypes.set_user_all_projects_userid:
            return {
                ...currState,
                userProjects: isPayloadDefined(action.payload) ? action.payload : []
            };


        case projectActionTypes.append_new_project:
            if (currState.userProjects.find((project: project) => project.projectId !== action.payload.projectId)) {
                return {
                    ...currState,
                    userProjects: [...currState.userProjects, action.payload]
                };
            }
            return currState;


        case projectActionTypes.remove_project_by_id:
            if (currState.userProjects.find((project: project) => project.projectId === action.payload.projectId)) {
                const newProjState: project[] = currState.userProjects.filter((project: project) => (
                    project.projectId !== action.payload.projectId
                ));

                return {
                    ...currState,
                    userProjects: newProjState
                };
            }
            return currState;


        case projectActionTypes.purge_project_data:
            return initialState;


        case projectActionTypes.update_project_by_id:
            if (currState.userProjects.find((project: project) => project.projectId === action.payload.projectId)) {
                const newProjState: project[] = currState.userProjects.map((project: project) => (
                    project.projectId !== action.payload.projectId ? project : action.payload
                ));

                return {
                    ...currState,
                    userProjects: newProjState
                }
            }
            return currState


        case projectActionTypes.set_user_all_starred_projects_userid:
            return {
                ...currState,
                starredProjects: isPayloadDefined(action.payload) ? action.payload : []
            }


        default:
            return currState;
    }
}