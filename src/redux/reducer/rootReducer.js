import { initialState } from "../state/initialState";
import {
    FETCH_MOVIE_LIST_REQUEST,
    FETCH_MOVIE_LIST_SUCCEEDED,
    FETCH_MOVIE_LIST_FAILED,
} from '../actionTypes/actionTypes';

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIE_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        };
        case FETCH_MOVIE_LIST_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                movieList: action.payload
            }
        };
        case FETCH_MOVIE_LIST_FAILED: {
            return {
                ...state,
                loading: false,
            }
        };
        default:
            return state;
    }
}