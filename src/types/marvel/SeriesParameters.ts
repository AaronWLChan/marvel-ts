import { Paginated } from "../utils";
import { IssueFormat } from "./IssueFormat";

export interface SeriesParameters extends Paginated {
    title?: string,
    titleStartWith?: string,
    startYear?: number,
    modifiedSince?: string,
    comics?: number | number[],
    stories?: number | number[],
    events?: number | number[],
    creators?: number | number[],
    seriesType?: "collection" | "one shot" | "limited" | "ongoing"
    contains?: IssueFormat,
    orderBy?: "title" | "modified" | "startYear" | "-title" | "-modified" | "-startYear",
}