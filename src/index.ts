import axios from "axios"
import rateLimit, { rateLimitOptions } from "axios-rate-limit"
import { Character, CharacterComicsParameters, CharacterDataContainer, CharacterDataWrapper, CharacterEventsParameters, CharacterParameters, ComicDataContainer, ComicDataWrapper,
     Comic, EventDataContainer, EventDataWrapper, Event, CharacterSeriesParameters, DataContainer, DataWrapper, SeriesDataContainer, SeriesDataWrapper, Series, CharacterStoriesParameters, 
     StoryDataContainer, StoryDataWrapper, Story, ComicParameters, ComicCharactersParameters, ComicCreatorsParameters, Creator, CreatorDataContainer, CreatorDataWrapper, ComicEventsParameters, 
     ComicStoriesParameters, CreatorParameters, CreatorComicsParameters, CreatorStoriesParameters, CreatorSeriesParameters, CreatorEventsParameters, StoriesParameters, StoryComicsParameters, StoryEventsParameters, 
     StorySeriesParameters, StoryCharactersParameters, SeriesParameters, SeriesComicsParameters, SeriesEventsParameters, SeriesCharactersParameters, SeriesStoriesParameters, EventsParameters, EventComicsParameters,
     EventCharactersParameters, EventSeriesParameters, EventStoriesParameters } from "./types"
import md5 from 'md5'

export class MarvelAPI {

    private publicKey: string
    private privateKey: string
    private BASE_URL = "https://gateway.marvel.com:443/v1/public"
    public _axios = rateLimit(axios.create(), { })

    /**
     * 
     * @param publicKey - Marvel Public Key
     * @param privateKey - Marvel Private Key (optional)
     * @param rateLimitOptions - [axios-rate-limit]({@link https://www.npmjs.com/package/axios-rate-limit}) options
     */
    constructor(publicKey: string, privateKey?: string, rateLimitOptions?: rateLimitOptions){
        this.publicKey = publicKey
        this.privateKey = privateKey

        if (rateLimitOptions) {
            this._axios.setRateLimitOptions(rateLimitOptions)
        }
    }
    
    /**
     * Builds URL query string.
     * @param obj - Parameters
     * @returns Query String
     */
    private queryString(obj: Object){
        
        return Object.keys(obj).map((key) => {

            let value = obj[key]

            if (Array.isArray(value)){
                value = value.join(",")
            }

            return `${key}=${value}`
        })
        .join("&")
    }

    /**
     * Makes a request to Marvel API wo/params.
     * @param endpoint - Marvel API endpoint
     * @returns - Promise<Wrapper of Type T>
     */
    private async request<Y, T extends DataContainer<Y>, Wrapper extends DataWrapper<Y, T>>(endpoint: string){

        let url = `${this.BASE_URL}/${endpoint}?apikey=${this.publicKey}`

        if (this.privateKey) {
            let ts = new Date().getTime()
            let hash = md5(ts + this.privateKey + this.publicKey)

            url += `&ts=${ts}&hash=${hash}`
        }
        
        return this._axios.get<Wrapper>(url)
                    .then((response) => {
                        return response.data
                    })


    }

    /**
     * Makes a request to Marvel API w/params.
     * @param endpoint - Marvel API endpoint
     * @param parameters - Params Object
     * @returns - Promise<Wrapper of Type T>
     */
    private async requestWParams<Y, T extends DataContainer<Y>, Wrapper extends DataWrapper<Y, T>, TParams extends Object>(endpoint: string, parameters?: TParams){

        parameters = {...parameters, apikey: this.publicKey, }

        if (this.privateKey) {
            let ts = new Date().getTime()
            let hash = md5(ts + this.privateKey + this.publicKey)

            parameters = {...parameters, ts, hash}
        }
        
        return this._axios.get<Wrapper>(`${this.BASE_URL}/${endpoint}?${this.queryString(parameters)}`)
                .then((response) => {
                    return response.data
                })

    }

    /**
     * Get Characters.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [CharacterParameters]({@link CharacterParameters})
     */
    public getCharacters(parameters?: CharacterParameters){
        return this.requestWParams<Character[], CharacterDataContainer, CharacterDataWrapper, CharacterParameters>("characters", parameters)
    }

    /**
     * Get Character By ID.
     * {@link https://developer.marvel.com/docs}
     * @param characterId - Character ID
    */
    public getCharacterById(characterId: number){
        return this.request<Character[], CharacterDataContainer, CharacterDataWrapper>(`characters/${characterId}`)
    }

    /**
     * Get Comics By Character ID.
     * {@link https://developer.marvel.com/docs}
     * @param characterId - Character ID
     * @param parameters - [CharacterComicsParameters]({@link CharacterComicsParameters})
    */
    public getCharacterComics(characterId: number, parameters?: CharacterComicsParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, CharacterComicsParameters>(`characters/${characterId}/comics`, parameters)
    }

    /**
     * Get Events By Character ID.
     * {@link https://developer.marvel.com/docs}
     * @param characterId - Character ID
     * @param parameters - [CharacterEventsParameters]({@link CharacterEventsParameters})
    */
    public getCharacterEvents(characterId: number, parameters?: CharacterEventsParameters) {
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, CharacterEventsParameters>(`characters/${characterId}/events`, parameters)
    }

    /**
     * Get Series By Character ID.
     * {@link https://developer.marvel.com/docs}
     * @param characterId - Character ID
     * @param parameters - [CharacterSeriesParameters]({@link CharacterSeriesParameters})
    */
    public getCharacterSeries(characterId: string, parameters?: CharacterSeriesParameters) {
        return this.requestWParams<Series[], SeriesDataContainer,SeriesDataWrapper, CharacterSeriesParameters>(`characters/${characterId}/series`, parameters)
    }

    /**
     * Get Stories By Character ID.
     * {@link https://developer.marvel.com/docs}
     * @param characterId - Character ID
     * @param parameters - [CharacterStoriesParameters]({@link CharacterStoriesParameters})
    */
    public getCharacterStories(characterId: string, parameters?: CharacterStoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, CharacterStoriesParameters>(`characters/${characterId}/stories`, parameters)
    }

    /**
     * Get Comics.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [ComicParameters]({@link ComicParameters})
    */
    public getComics(parameters?: ComicParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, ComicParameters>(`comics`, parameters)
    }

    /**
     * Get Comic by ID.
     * {@link https://developer.marvel.com/docs}
     * @param comicId - Comic ID
    */
    public getComicById(comicId: number) {
        return this.request<Comic[], ComicDataContainer, ComicDataWrapper>(`comics/${comicId}`)
    }

    /**
     * Get Comic Characters.
     * {@link https://developer.marvel.com/docs}
     * @param comicId - Comic ID
     * @param parameters - [ComicCharactersParameters]({@link ComicCharactersParameters})
    */
    public getComicCharacters(comicId: number, parameters?: ComicCharactersParameters){
        return this.requestWParams<Character[], CharacterDataContainer, CharacterDataWrapper, ComicCharactersParameters>(`comics/${comicId}/characters`, parameters)
    }

    /**
     * Get Comic Creators.
     * {@link https://developer.marvel.com/docs}
     * @param comicId - Comic ID
     * @param parameters - [ComicCreatorsParameters]({@link ComicCreatorsParameters})
    */
    public getComicCreators(comicId: number, parameters?: ComicCreatorsParameters){
        return this.requestWParams<Creator[], CreatorDataContainer, CreatorDataWrapper, ComicCreatorsParameters>(`comics/${comicId}/creators`, parameters)
    }

    /**
     * Get Comic Events.
     * {@link https://developer.marvel.com/docs}
     * @param comicId - Comic ID
     * @param parameters - [ComicEventsParameters]({@link ComicEventsParameters})
    */
    public getComicEvents(comicId: number, parameters?: ComicEventsParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, ComicEventsParameters>(`comics/${comicId}/events`, parameters)
    }

    /**
     * Get Comic Stories.
     * {@link https://developer.marvel.com/docs}
     * @param comicId - Comic ID
     * @param parameters - [ComicStoriesParameters]({@link ComicStoriesParameters})
    */
    public getComicStories(comicId: number, parameters?: ComicStoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, ComicStoriesParameters>(`comics/${comicId}/stories`, parameters)
    }

    /**
     * Get Creators.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [CreatorParameters]({@link CreatorParameters})
    */
    public getCreators(parameters?: CreatorParameters){
        return this.requestWParams<Creator[], CreatorDataContainer, CreatorDataWrapper, CreatorParameters>(`creators`, parameters)
    }

    /**
     * Get Creator by ID.
     * {@link https://developer.marvel.com/docs}
     * @param creatorId - Creator ID
    */
    public getCreatorById(creatorId: number){
        return this.request<Creator[], CreatorDataContainer, CreatorDataWrapper>(`creator/${creatorId}`)
    }

    /**
     * Get Creator Comics.
     * {@link https://developer.marvel.com/docs}
     * @param creatorId - Creator ID
     * @param parameters - [CreatorComicsParameters]({@link CreatorComicsParameters})
    */
    public getCreatorComics(creatorId: number, parameters?: CreatorComicsParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, CreatorComicsParameters>(`creator/${creatorId}/comics`, parameters)
    }

    /**
     * Get Creator Events.
     * {@link https://developer.marvel.com/docs}
     * @param creatorId - Creator ID
     * @param parameters - [CreatorComicsParameters]({@link CreatorComicsParameters})
    */
    public getCreatorEvents(creatorId: number, parameters?: CreatorEventsParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, CreatorEventsParameters>(`creator/${creatorId}/events`, parameters)

    }

    /**
     * Get Creator Series.
     * {@link https://developer.marvel.com/docs}
     * @param creatorId - Creator ID
     * @param parameters - [CreatorSeriesParameters]({@link CreatorSeriesParameters})
    */
    public getCreatorSeries(creatorId: number, parameters?: CreatorSeriesParameters){
        return this.requestWParams<Series[], SeriesDataContainer, SeriesDataWrapper, CreatorSeriesParameters>(`creator/${creatorId}/series`, parameters)

    }

    /**
     * Get Creator Stories.
     * {@link https://developer.marvel.com/docs}
     * @param creatorId - Creator ID
     * @param parameters - [CreatorStoriesParameters]({@link CreatorStoriesParameters})
    */
    public getCreatorStories(creatorId: number, parameters?: CreatorStoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, CreatorStoriesParameters>(`creator/${creatorId}/stories`, parameters)

    }

    /**
     * Get Events.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [EventsParameters]({@link EventsParameters})
    */
    public getEvents(parameters?: EventsParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, EventsParameters>(`events`, parameters)
    }

    /**
     * Get Event By ID.
     * {@link https://developer.marvel.com/docs}
     * @param eventId - Event ID
    */
    public getEventById(eventId: number){
        return this.request<Event[], EventDataContainer, EventDataWrapper>(`events/${eventId}`)
    }

    /**
     * Get Event Comics.
     * {@link https://developer.marvel.com/docs}
     * @param eventId - Event ID
     * @param parameters - [EventComicsParameters]({@link EventComicsParameters}
    */
    public getEventComics(eventId: number, parameters?: EventComicsParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, EventComicsParameters>(`events/${eventId}/comics`, parameters)
    }

    /**
     * Get Event Characters.
     * {@link https://developer.marvel.com/docs}
     * @param eventId - Event ID
     * @param parameters - [EventCharactersParameters]({@link EventCharactersParameters}
    */
    public getEventCharacters(eventId: number, parameters?: EventCharactersParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, EventCharactersParameters>(`events/${eventId}/characters`, parameters)

    }
    
    /**
     * Get Event Series.
     * {@link https://developer.marvel.com/docs}
     * @param eventId - Event ID
     * @param parameters - [EventSeriesParameters]({@link EventSeriesParameters}
    */
    public getEventSeries(eventId: number, parameters?: EventSeriesParameters){
        return this.requestWParams<Series[], SeriesDataContainer, SeriesDataWrapper, EventSeriesParameters>(`events/${eventId}/series`, parameters)

    }

    /**
     * Get Event Stories.
     * {@link https://developer.marvel.com/docs}
     * @param eventId - Event ID
     * @param parameters - [EventStoriesParameters]({@link EventStoriesParameters}
    */
    public getEventStories(eventId: number, parameters?: EventStoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, EventStoriesParameters>(`events/${eventId}/stories`, parameters)

    }

    /**
     * Get Series.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [SeriesParameters]({@link SeriesParameters}
    */
    public getSeries(parameters?: SeriesParameters){
        return this.requestWParams<Series[], SeriesDataContainer, SeriesDataWrapper, SeriesParameters>(`series`, parameters)
    }

    /**
     * Get Series by ID.
     * {@link https://developer.marvel.com/docs}
     * @param seriesId - Series ID
    */
    public getSeriesById(seriesId: number){
        return this.request<Series[], SeriesDataContainer, SeriesDataWrapper>(`series/${seriesId}`)
    }

    /**
     * Get Series Comics.
     * {@link https://developer.marvel.com/docs}
     * @param seriesId - Series ID
     * @param parameters - [SeriesComicsParameters]({@link SeriesComicsParameters}
    */
    public getSeriesComics(seriesId: number, parameters?: SeriesComicsParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, SeriesComicsParameters>(`series/${seriesId}/comics`, parameters)
    }

    /**
     * Get Series Events.
     * {@link https://developer.marvel.com/docs}
     * @param seriesId - Series ID
     * @param parameters - [SeriesEventsParameters]({@link SeriesEventsParameters}
    */
    public getSeriesEvents(seriesId: number, parameters?: SeriesEventsParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, SeriesEventsParameters>(`series/${seriesId}/events`, parameters)

    }
    
    /**
     * Get Series Characters.
     * {@link https://developer.marvel.com/docs}
     * @param seriesId - Series ID
     * @param parameters - [SeriesCharactersParameters]({@link SeriesCharactersParameters}
    */
    public getSeriesCharacters(seriesId: number, parameters?: SeriesCharactersParameters){
        return this.requestWParams<Series[], SeriesDataContainer, SeriesDataWrapper, SeriesCharactersParameters>(`series/${seriesId}/characters`, parameters)

    }

    /**
     * Get Series Stories.
     * {@link https://developer.marvel.com/docs}
     * @param seriesId - Series ID
     * @param parameters - [SeriesStoriesParameters]({@link SeriesStoriesParameters}
    */
    public getSeriesStories(seriesId: number, parameters?: SeriesStoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, SeriesStoriesParameters>(`series/${seriesId}/stories`, parameters)

    }

    /**
     * Get Stories.
     * {@link https://developer.marvel.com/docs}
     * @param parameters - [StoriesParameters]({@link StoriesParameters}
    */
    public getStories(parameters?: StoriesParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, StoriesParameters>(`stories`, parameters)
    }

    /**
     * Get Story by ID.
     * {@link https://developer.marvel.com/docs}
     * @param storyId - Story ID
    */
    public getStoryById(storyId: number){
        return this.request<Creator[], StoryDataContainer, StoryDataWrapper>(`stories/${storyId}`)
    }

    /**
     * Get Story Comics.
     * {@link https://developer.marvel.com/docs}
     * @param storyId - Story ID
     * @param parameters - [StoryComicsParameters]({@link StoryComicsParameters}
    */
    public getStoryComics(storyId: number, parameters?: StoryComicsParameters){
        return this.requestWParams<Comic[], ComicDataContainer, ComicDataWrapper, StoryComicsParameters>(`story/${storyId}/comics`, parameters)
    }

    /**
     * Get Story Events.
     * {@link https://developer.marvel.com/docs}
     * @param storyId - Story ID
     * @param parameters - [StoryEventsParameters]({@link StoryEventsParameters}
    */
    public getStoryEvents(storyId: number, parameters?: StoryEventsParameters){
        return this.requestWParams<Event[], EventDataContainer, EventDataWrapper, StoryEventsParameters>(`story/${storyId}/events`, parameters)

    }
    
    /**
     * Get Story Series.
     * {@link https://developer.marvel.com/docs}
     * @param storyId - Story ID
     * @param parameters - [StorySeriesParameters]({@link StorySeriesParameters}
    */
    public getStorySeries(storyId: number, parameters?: StorySeriesParameters){
        return this.requestWParams<Series[], SeriesDataContainer, SeriesDataWrapper, StorySeriesParameters>(`story/${storyId}/series`, parameters)

    }

    /**
     * Get Story Characters.
     * {@link https://developer.marvel.com/docs}
     * @param storyId - Story ID
     * @param parameters - [StoryCharactersParameters]({@link StoryCharactersParameters}
    */
    public getStoryCharacters(storyId: number, parameters?: StoryCharactersParameters){
        return this.requestWParams<Story[], StoryDataContainer, StoryDataWrapper, StoryCharactersParameters>(`story/${storyId}/characters`, parameters)

    }
    
}