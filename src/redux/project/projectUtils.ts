import * as config from "../../PublicEnv.json";
import { handleNetworkErrors } from "../generalUtils";
import axios from "axios";
import { project, ProjectUpdate } from "./projectTypes";

export async function getUserAllProjectsByUserId(userId) {
    try {
        const response = await axios.get(`${config.API_BASE}/users/${userId}/projects`);

        if (response && response.data) {
            return response.data;
        }
        return [];
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}


export async function addProject(projectCreateRequest: any) {
    try {
        const response = await axios.post(`${config.API_BASE}/projects`, projectCreateRequest);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}


export async function deleteProject(projectId: string) {
    try {
        const response = await axios.delete(`${config.API_BASE}/projects/${projectId}`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function getPopularProjects() {
    try {
        const response = await axios.get(`${config.API_BASE}/browse`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}


export async function getStarredProjectsByUserId(userId: string) {
    try {
        const response = await axios.get(`${config.API_BASE}/projects/${userId}/starred`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function getProjectByProjectId(projectId: string) {
    try {
        const response = await axios.get(`${config.API_BASE}/projects/${projectId}`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function updateProjectByProjectId(projectId: string, updateProject: ProjectUpdate) {
    try {
        const response = await axios.put(`${config.API_BASE}/projects/${projectId}`, updateProject);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export function sortProjectsByParam(
    projectArr: project[],
    sortParam: string,
    keyword?: string,
    starredArr?: project[]) {


    switch (sortParam) {
        case "popular":
            console.log("popular");
            return projectArr.sort((curr, next) => next.likeNumber - curr.likeNumber);


        case "starred":
            return starredArr ? starredArr : [];


        case "new":
            return projectArr.sort((curr, next) => next.createdAtUnix - curr.createdAtUnix);


        case "old":
            return projectArr.sort((curr, next) => curr.createdAtUnix - next.createdAtUnix);


        case "search":
            if (keyword === "" || keyword === undefined) {
                return projectArr;
            }
            return projectArr.filter(p => p.title.toLowerCase().includes(keyword.toLowerCase()));


        default:
            console.log("no sort");
            return projectArr;
    }
}


export async function likeProject(userId: string, projectId: string) {
    try {
        const response = await axios.get(`${config.API_BASE}/projects/${projectId}/like/${userId}`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function starProject(userId: string, projectId: string) {
    try {
        const response = await axios.get(`${config.API_BASE}/projects/${projectId}/star/${userId}`);

        if (response && response.data) {
            return response.data; //TODO need to update array of starred stuff ?
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}