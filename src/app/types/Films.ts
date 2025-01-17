export type Genre = 'DRAMA' | 'ACTION' | 'SCIENCE_FICTION' | 'THRILLER' | 'UNKNOWN';

export enum FilmGenre {
    DRAMA = 'Drama',
    ACTION = 'Action',
    SCIENCE_FICTION = 'Science Fiction',
    THRILLER = 'Thriller',
    UNKNOWN = 'Unknown',
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