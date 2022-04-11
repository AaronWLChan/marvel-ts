import { CharacterList, CharacterParameters, ComicList, ComicParameters, CreatorList, CreatorParameters, EventSummary, Image, SeriesList, SeriesParameters, StoriesParameters, StoryList, Url } from "../../marvel";
import { DataContainer } from "../../marvel/DataContainer";
import { DataWrapper } from "../../marvel/DataWrapper";
import { Identifiable } from "../../utils";

export interface Event extends Identifiable {
    title?: string,
    description?: string,
    resourceURI?: string,
    urls?: Url[],
    modified?: string,
    start?: string,
    end?: string,
    thumbnail?: Image,
    comics?: ComicList,
    stories?: StoryList,
    series?: SeriesList,
    characters?: CharacterList,
    creators?: CreatorList,
    next?: EventSummary,
    previous?: EventSummary
}

export interface EventDataWrapper extends DataWrapper<Event[], EventDataContainer>{}

export interface EventDataContainer extends DataContainer<Event[]>{}

export interface EventCharactersParameters extends CharacterParameters{}

export interface EventComicsParameters extends ComicParameters{}

export interface EventCreatorsParameters extends CreatorParameters{}

export interface EventSeriesParameters extends SeriesParameters{}

export interface EventStoriesParameters extends StoriesParameters{}