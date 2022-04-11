import { StorySummary } from "./StorySummary";

export interface StoryList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items: StorySummary[]
}
