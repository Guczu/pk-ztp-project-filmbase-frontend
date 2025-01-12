export type Film = {
    id: number;
    title: string;
    director: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
    genre: string;
}

export type Pagination = {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}