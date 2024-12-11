export interface Ipageable {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    offset: number;
    sort: Isort;
}

export interface Isort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Ipage<T> {
    totalPages: number;
    totalElements: number;
    pageable: Ipageable;
    size: number;
    content: T[];
    number: number;
    sort: Isort;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}
