import {
    FETCH_MOVIE_LIST_REQUEST,
} from '../actionTypes/actionTypes';

export function getMovieList() {
    return {
        type: FETCH_MOVIE_LIST_REQUEST,
    }
}
