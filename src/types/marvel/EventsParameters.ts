import { Paginated } from "../utils";

export interface EventsParameters extends Paginated {
    name?: string,
    nameStartsWith?: string,
    modifiedSince?: string,
    creators?: number | number[],
    series?: number | number[],
    events?: number | number[],
    stories?: number | number[],
    orderBy?: "name" | "startDate" | "modified" | "-name" | "-startDate" | "-modified"
}