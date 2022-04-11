import { CharacterSummary } from "./CharacterSummary";

export interface CharacterList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterSummary[]
}