import {createStore, combineReducers} from 'redux';
import {UserDetailsReducer} from './Reducers/UserReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  whitelist: ['UserDetailsReducer'],
};

const rootReducer = combineReducers({UserDetailsReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store, null, () => {
  console.log({name: 'Persisted state', value: store.getState()});
});
