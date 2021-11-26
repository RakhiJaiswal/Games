import {createStore, combineReducers, applyMiddleware} from 'redux';
import {UserDetailsReducer} from './Reducers/UserReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  whitelist: ['UserDetailsReducer'],
};

const rootReducer = combineReducers({UserDetailsReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [];

middleWares.push(logger);

const middleWare = applyMiddleware(...middleWares);

export const store = createStore(persistedReducer, middleWare);

persistStore(store, null, () => {
  console.log({name: 'Persisted state', value: store.getState()});
});
