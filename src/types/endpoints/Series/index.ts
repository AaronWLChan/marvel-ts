import { CharacterList, CharacterParameters, ComicList, ComicParameters, CreatorList, CreatorParameters, DataContainer, DataWrapper, EventList, EventsParameters, Image, SeriesSummary, StoriesParameters, StoryList, Url } from "../../marvel";
import { Identifiable } from "../../utils";

export interface Series extends Identifiable {
    title?: string,
    description?: string,
    resourceURI?: string,
    urls?: Url[],
    startYear?: number,
    endYear?: number,
    rating?: string,
    modified?: string,
    thumbnail?: Image,
    comics?: ComicList,
    stories?: StoryList,
    events?: EventList,
    characters?: CharacterList,
    creators?: CreatorList,
    next?: SeriesSummary,
    previous?: SeriesSummary
}

export interface SeriesDataWrapper extends DataWrapper<Series[], SeriesDataContainer> {}

export interface SeriesDataContainer extends DataContainer<Series[]>{}

export interface SeriesCharactersParameters extends CharacterParameters{}

export interface SeriesComicsParameters extends ComicParameters{}

export interface SeriesCreatorsParameters extends CreatorParameters{}

export interface SeriesEventsParameters extends EventsParameters{}

export interface SeriesStoriesParameters extends StoriesParameters{}