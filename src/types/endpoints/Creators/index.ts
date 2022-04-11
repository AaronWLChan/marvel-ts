import { ComicList, ComicParameters, DataContainer, DataWrapper, EventList, EventsParameters, Image, SeriesList, SeriesParameters, StoriesParameters, StoryList, Url } from "../../marvel";
import { Identifiable } from "../../utils";

export interface Creator extends Identifiable {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    suffix?: string,
    fullName?: string,
    modified?: string,
    resourceURI?: string,
    urls?: Url[],
    thumbnail?: Image,
    series?: SeriesList,
    stories?: StoryList,
    comics?: ComicList,
    events?: EventList
}

export interface CreatorDataWrapper extends DataWrapper<Creator[], CreatorDataContainer>{}

export interface CreatorDataContainer extends DataContainer<Creator[]>{}

export interface CreatorComicsParameters extends ComicParameters{}

export interface CreatorEventsParameters extends EventsParameters{}

export interface CreatorSeriesParameters extends SeriesParameters{}

export interface CreatorStoriesParameters extends StoriesParameters{}