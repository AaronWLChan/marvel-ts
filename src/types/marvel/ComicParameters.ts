import { Paginated } from "../utils";
import { DateDescriptor } from "./DateDescriptor";
import { FormatType } from "./FormatType";
import { IssueFormat } from "./IssueFormat";

export interface ComicParameters extends Paginated {
    format?: IssueFormat,
    formatType?: FormatType,
    noVariants?: boolean,
    dateDescriptor?: DateDescriptor,
    dateRange?: string | string[],
    title?: string,
    titleStartsWith?: string,
    startYear?: number,
    issueNumber?: number,
    diamondCode?: number,
    digitalId?: number,
    upc?: string,
    isbn?: string,
    ean?: string,
    issn?: string,
    hasDigitalIssue?: boolean,
    modifiedSince?: string,
    characters?: number | number[],
    series?: number | number[],
    events?: number | number[],
    stories?: number | number[],
    sharedAppearances?: number | number[],
    collaborators?: number | number[],
    orderBy?: "focDate" | "onsaleDate" | "title" | "issueNumber" | "modified" | "-focDate" | "-onsaleDate" | "-title" | "-issueNumber" | "-modified",
}