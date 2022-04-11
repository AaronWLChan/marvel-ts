import { ComicList, ComicParameters, DataContainer, DataWrapper, EventList, EventsParameters, Image, SeriesList, SeriesParameters, StoriesParameters, StoryList, Url } from "../../marvel";
import { Identifiable } from "../../utils";

export interface Character extends Identifiable  {
    name?: string,
    description?: string,
    modified?: string,
    resourceURI?: string,
    urls?: Url[],
    thumbnail?: Image,
    comics?: ComicList,
    stories?: StoryList,
    events?: EventList,
    series?: SeriesList,
}

export interface CharacterDataWrapper extends DataWrapper<Character[], CharacterDataContainer>{}

export interface CharacterDataContainer extends DataContainer<Character[]>{}

export interface CharacterComicsParameters extends ComicParameters {}

export interface CharacterEventsParameters extends EventsParameters {}

export interface CharacterSeriesParameters extends SeriesParameters {}

export interface CharacterStoriesParameters extends StoriesParameters {}
















