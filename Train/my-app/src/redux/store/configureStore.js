import { createStore , applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducers from '../reducer/rootReducer';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../saga/rootSaga";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''] // only navigation will be persisted
}



const saga = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = createStore(persistedReducer , applyMiddleware(saga));
saga.run(rootSaga);


export default () => {
  let persistor = persistStore(store);
  return { store, persistor }
}
