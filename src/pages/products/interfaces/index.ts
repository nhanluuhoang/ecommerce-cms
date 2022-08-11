export interface ProductDTO {
    category_id?: number,
    title: string,
    descriptions: string,
    thumbnails: any,
    price: number,
    status: boolean,
    quantity: number,
    options?: [],
    option_values?: [],
    variant_values: []
}

export interface IParams {
    'filter[title]': string | null;
    'filter[category_id]': string | null;
    'filter[sku]': string | null;
    'include'?: string;
    'sort': string | null;
    'page[size]': number | null,
    'page[number]': number | null
}

export interface IGetProducts {
    success: boolean;
    data: IProduct[];
    pagination: IPagination
}

export interface IGetProduct {
    success: boolean;
    data: IProduct;
}

export interface IProduct {
    id: number;
    category_id?: number;
    category_title?: string;
    title: string;
    slug: string;
    descriptions: string;
    thumbnails: any;
    price: string;
    status: boolean;
    sku: string;
    quantity: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    options?: IOptions[];
    option_values?: IOptions[];
    variant_values?: any[];
    optionAndValue?: IOptionAndValue[]
    images?: any
}

export interface IOptions {
    id: any;
    value: string
}

export interface IOptionAndValue {
    id: any;
    option: string;
    values: IOptions[]
}

export interface IPagination {
    count: number;
    currentPage: number;
    links: string;
    perPage: string;
    total: number;
    totalPages: number
}

// Options
export interface OptionDTO {
    value: string
}

export interface IGetOptions {
    success: boolean;
    data: IOptions[];
}

export interface IGetOption {
    success: boolean;
    data: IOptions;
}

export interface IOptions {
    id: any;
    value: string;
}
