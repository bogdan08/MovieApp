import { initialState } from "../state/initialState";
import {
    FETCH_MOVIE_LIST_REQUEST,
    FETCH_MOVIE_LIST_SUCCEEDED,
    FETCH_MOVIE_LIST_FAILED,
    FETCH_INTERNET_CONNECTION_REQUEST,
    FETCH_INTERNET_CONNECTION_SUCCEEDED,
    FETCH_INTERNET_CONNECTION_FAILED
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
        case FETCH_INTERNET_CONNECTION_REQUEST: {
            return {
                ...state,
                loading: true,
            }
        };
        case FETCH_INTERNET_CONNECTION_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                isConnected: action.payload
            }
        };
        case FETCH_INTERNET_CONNECTION_FAILED: {
            return {
                ...state,
                loading: false,
            }
        };
        default:
            return state;
    }
}