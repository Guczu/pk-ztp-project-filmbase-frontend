import { User } from "./Auth";

export type Comment = {
    comment: string;
    createdAt: Date;
    id: number;
    filmId?: number;
    user?: User;
}