export interface LoginResponse {
    access_token: string
}

export interface Profile {
    id: number,
    email: string,
    phone: string,
    full_name?: string,
    gender?: string,
    address?: object,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string
}

export interface AuthUser {
    success: boolean,
    data: Profile
}
