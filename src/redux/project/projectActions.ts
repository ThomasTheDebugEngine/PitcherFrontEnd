import { projectActionTypes } from "./projectTypes";
import { ProjectRequest, ProjectUpdate, project } from "./projectTypes";

export function setProjectsOfUser(projectArr: project[]) {
    return {
        type: projectActionTypes.set_user_all_projects_userid,
        payload: projectArr
    };
}

export function appendNewProjectAction(project: ProjectRequest) {
    return {
        type: projectActionTypes.append_new_project,
        payload: project
    };
}

export function removeProject(project: string) {
    return {
        type: projectActionTypes.remove_project_by_id,
        payload: project
    };
}

export function updateProjectAction(projectId: string, project: ProjectUpdate) {
    return {
        type: projectActionTypes.update_project_by_id,
        payload: project
    }
}

export function setUserStarredProjectsAction(projectArr: project[]) {
    return {
        type: projectActionTypes.set_user_all_starred_projects_userid,
        payload: projectArr
    }
}

export function purgeProjectData() {
    return {
        type: projectActionTypes.purge_project_data
    };
}