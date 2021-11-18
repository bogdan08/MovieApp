import {
    FETCH_MOVIE_LIST_REQUEST,
    FETCH_INTERNET_CONNECTION_REQUEST
} from '../actionTypes/actionTypes';

export function getMovieList() {
    return {
        type: FETCH_MOVIE_LIST_REQUEST,
    }
}
export function getInternetConnection(){
    return {
        type: FETCH_INTERNET_CONNECTION_REQUEST,
    }
}