import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from '../reducer/rootReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from '../saga/mainSaga';

//Main Store of the app with persisting configurations
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store, null, () => {
    sagaMiddleware.run(mainSaga)
});

export { store, persistor };