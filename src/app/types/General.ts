import { Pagination } from "./Films";

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface PagedApiResponse<T> {
    message: string;
    data: {
      content: T;
      page: Pagination;
    };
}