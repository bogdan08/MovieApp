import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Services from '../../services/Services';
import {
    FETCH_MOVIE_LIST_REQUEST,
    FETCH_MOVIE_LIST_SUCCEEDED,
    FETCH_MOVIE_LIST_FAILED,
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

//Main Saga of the app, for documentation visit: https://redux-saga.js.org/
export function* mainSaga() {
    yield takeLatest(FETCH_MOVIE_LIST_REQUEST, getMovieList);
}