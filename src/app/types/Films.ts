export type Genre = 'DRAMA' | 'ACTION' | 'SCIENCE_FICTION' | 'THRILLER';

export enum FilmGenre {
    DRAMA = 'Drama',
    ACTION = 'Action',
    SCIENCE_FICTION = 'Science Fiction',
    THRILLER = 'Thriller',
}

export type Film = {
    id: number;
    title: string;
    director: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
    genre: Genre;
}

export type Pagination = {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}