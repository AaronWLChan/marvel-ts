import { Paginated } from "../utils";

export interface StoriesParameters extends Paginated {
    modifiedSince?: string,
    comics?: number | number[],
    series?: number | number[],
    events?: number | number[],
    creators?: number | number[],
    orderBy?: "id" | "modified" | "-id" | "-modified",
}