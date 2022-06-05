export interface IAddressParams {
    'filter[kind]'?: number | null;
    'filter[parent_id]'?: number | null
}

export interface IGetUsers {
    success: boolean;
    data: IUser[];
    pagination: IPagination
}

export interface IGetUser {
    success: boolean;
    data: IUser;
}

export interface IGetAddresses {
    success: boolean;
    data: IAddresses[];
}

export interface IUser {
    id: number;
    email: string;
    phone: string;
    full_name?: string;
    gender?: string;
    address?: IAddress[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string
}

export interface IPagination {
    count: number;
    currentPage: number;
    links: string;
    perPage: string;
    total: number;
    totalPages: number
}

export interface IAddresses {
    id: number;
    kind: number;
    value: string;
    parent_id?: number
}

export interface IAddress {
    address?: string;
    default?: boolean;
    district_id?: number;
    province_id?: number;
    ward_id?: number;
}

export interface IUpdateUserDTO {
    email: string,
    full_name: string,
    phone: string,
    gender: string,
    address: IAddress[],
}
