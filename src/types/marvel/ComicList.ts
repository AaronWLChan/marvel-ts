import { ComicSummary } from "./ComicSummary";

export interface ComicList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items: ComicSummary[]
}