import axios from 'axios';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './root-reducer';
import * as api from '../config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument({
      client: axios,
      api,
    })
  )
))

export const persistor = persistStore(store)