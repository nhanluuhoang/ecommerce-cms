export interface CategoryDTO {
    title: string;
    parent_id: number | undefined;
    sort_order: number;
    is_public: boolean;
}

export interface IGetCategories {
    success: boolean;
    data: ICategories[];
    pagination: IPagination
}

export interface IGetCategory {
    success: boolean;
    data: ICategory;
}

export interface ICategories {
    id: number;
    title: string;
    sort_order: number;
    is_public: boolean;
    children?: ICategories[]
    parent_id?: number
}

export interface ICategory {
    id: number;
    title: string;
    sort_order: number;
    is_public: boolean;
    parent?: ICategory
    parent_id?: number
}

export interface IPagination {
    count: number;
    currentPage: number;
    links: string;
    perPage: string;
    total: number;
    totalPages: number
}
