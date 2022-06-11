export interface CategoryDTO {
    name: string;
    parent_id: number | undefined;
    sort_order: number;
    is_public: boolean;
}

export interface IParams {
    'filter[is_public]': boolean | null;
    'filter[parent_id]': string | null;
    'sort': string | null;
}

export interface IGetCategories {
    success: boolean;
    data: ICategory[];
    pagination: IPagination
}

export interface IGetCategory {
    success: boolean;
    data: ICategory;
}

export interface ICategory {
    id: number;
    name: string;
    parent_title?: string | undefined;
    slug: string;
    sort_order: number;
    is_public: boolean;
    children: ICategory[]
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
