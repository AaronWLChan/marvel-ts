import { CreatorSummary } from "./CreatorSummary";

export interface CreatorList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CreatorSummary[]
}