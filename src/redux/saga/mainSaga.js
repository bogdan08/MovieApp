import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Services from '../../services/Services';
import {
    FETCH_MOVIE_LIST_REQUEST,
    FETCH_MOVIE_LIST_SUCCEEDED,
    FETCH_MOVIE_LIST_FAILED,
    FETCH_INTERNET_CONNECTION_REQUEST,
    FETCH_INTERNET_CONNECTION_SUCCEEDED,
    FETCH_INTERNET_CONNECTION_FAILED
} from '../actionTypes/actionTypes';

export function* getMovieList(action) {
    try {
        const response = yield call(Services.getMovieList);
        if (response.results) {
            yield put({
                type: FETCH_MOVIE_LIST_SUCCEEDED,
                payload: response.results
            })
        }
        else {
            yield put({
                type: FETCH_MOVIE_LIST_FAILED,
                error: err
            })
        }

    } catch (err) {
        yield put({ type: FETCH_MOVIE_LIST_FAILED, error: err })
    }
}
export function* getInternetConnection(action) {
    try {
        const response = yield call(Services.getConnectionStatus);
        if (response) {
            yield put({
                type: FETCH_INTERNET_CONNECTION_SUCCEEDED,
                payload: response.isConnected
            })
        }
        else {
            yield put({
                type: FETCH_INTERNET_CONNECTION_FAILED,
                error: err
            })
        }

    } catch (err) {
        console.log(err)
        yield put({ type: FETCH_MOVIE_LIST_FAILED, error: err })
    }
}

//Main Saga of the app, for documentation visit: https://redux-saga.js.org/
export function* mainSaga() {
    yield takeLatest(FETCH_MOVIE_LIST_REQUEST, getMovieList);
    yield takeLatest(FETCH_INTERNET_CONNECTION_REQUEST, getInternetConnection);
}