
export interface project {
    title: string,
    description: string,
    body: string,
    createdAtUnix: number,
    likeNumber: number,
    ownerId: string,
    projectId: string;
}

export interface ProjectUpdate {
    Title: string,
    Description: string,
    Body: string,
    OwnerId: string;
    ProjectId: string;
}

export interface ProjectRequest {
    Title: string,
    Description: string,
    Body: string,
    OwnerId: string;
}

export const projectActionTypes = {
    set_user_all_projects_userid: "set_user_all_projects_userid",
    set_user_all_starred_projects_userid: "set_user_all_starred_projects_userid",

    append_new_project: "append_new_project",
    remove_project_by_id: "remove_project_by_id",
    purge_project_data: "purge_project_data",
    update_project_by_id: "update_project_by_id",

}