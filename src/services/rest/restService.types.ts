export interface RequestParams extends RequiredParams {
    data?: any;
}

export interface RequiredParams {
    owner: string;
    repo: string;
    token: string;
}
