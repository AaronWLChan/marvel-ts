import { CharacterList, CharacterParameters, ComicList, ComicParameters, ComicSummary, CreatorList, CreatorParameters, DataContainer, DataWrapper, EventList, EventsParameters, Image, SeriesList, SeriesParameters } from "../../marvel";
import { Identifiable } from "../../utils";

export interface Story extends Identifiable{
    title?: string,
    description?: string,
    resourceURI?: string,
    type?: string,
    modified?: string,
    thumbnail?: Image,
    comics?: ComicList,
    series?: SeriesList,
    events?: EventList,
    characters?: CharacterList,
    creators?: CreatorList,
    originalIssue?: ComicSummary
}

export interface StoryDataWrapper extends DataWrapper<Story[], StoryDataContainer> {}

export interface StoryDataContainer extends DataContainer<Story[]> {}

export interface StoryCharactersParameters extends CharacterParameters{}

export interface StoryComicsParameters extends ComicParameters{}

export interface StoryCreatorsParameters extends CreatorParameters{}

export interface StoryEventsParameters extends EventsParameters{}

export interface StorySeriesParameters extends SeriesParameters{}