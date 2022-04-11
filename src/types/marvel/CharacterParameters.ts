import { Paginated } from "../utils";

export interface CharacterParameters extends Paginated {
    name?: string,
    nameStartsWith?: string,
    modifiedSince?: number,
    comics?: number | number[],
    series?: number | number[],
    events?: number | number[],
    stories?: number | number[],
    orderBy?: "name" | "modified" | "-name" | "-modified",

}