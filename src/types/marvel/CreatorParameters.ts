import { Paginated } from "../utils";

export interface CreatorParameters extends Paginated {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    suffix?: string,
    nameStartsWith?: string,
    firstNameStartsWith?: string,
    middleNameStartsWith?: string,
    lastNameStartWith?: string,
    modifiedSince?: string,
    comics?: number | number[],
    series?: number | number[],
    events?: number | number[],
    stories?: number | number[],
    orderBy?: "lastName" | "firstName" | "middleName" | "suffix" | "modified" | "-lastName" | "-firstName" | "-middleName" | "-suffix" | "-modified"

}