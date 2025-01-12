import { User } from "./Auth";

export type Rating = {
    id: number;
    grade: number;
    filmId?: number;
    user?: User;
}