import { CharacterList, CharacterParameters, ComicDate, ComicPrice, ComicSummary, CreatorList, CreatorParameters, DataContainer, DataWrapper, EventList, Image, SeriesSummary, StoryList, TextObject, Url } from "../../marvel";
import { Identifiable } from "../../utils";

export interface Comic extends Identifiable {
    digitalId?: number,
    title?: string,
    issueNumber?: number,
    variantDescription?: string,
    description?: string,
    modified?: string,
    isbn?: string,
    upc?: string,
    diamondCode?: string,
    ean?: string,
    issn?: string,
    format?: string,
    pageCount?: number,
    textObjects?: TextObject[],
    resourceURI?: string,
    urls?: Url[],
    series?: SeriesSummary,
    variants?: ComicSummary[]
    collections?: ComicSummary[]
    collectedIssues?: ComicSummary[],
    dates?: ComicDate[],
    prices?: ComicPrice[],
    thumbnail?: Image,
    creators?: CreatorList,
    characters?: CharacterList,
    stories?: StoryList,
    events?: EventList
}

export interface ComicDataWrapper extends DataWrapper<Comic[], ComicDataContainer>{}

export interface ComicDataContainer extends DataContainer<Comic[]> {}

export interface ComicCharactersParameters extends CharacterParameters {}

export interface ComicCreatorsParameters extends CreatorParameters {}

export interface ComicEventsParameters{}

export interface ComicStoriesParameters{}

