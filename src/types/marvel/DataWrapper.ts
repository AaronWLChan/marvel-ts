import { DataContainer } from "./DataContainer";

export interface DataWrapper<Y, T extends DataContainer<Y>> {
    code?: number,
    status?: string,
    copyright?: string,
    attributionText?: string,
    attributionHTML?: string,
    data?: T,
    etag?: string
}