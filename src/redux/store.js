// todo common package
//
//  GLOBAL REDUX ACTIONS             //
// --------------------------------- //
//  DON'T ADD MORE ACTIONS HERE !    //
// --------------------------------- //
// ADD Redux action in screen folder //
// Scoped for the functions folders  //
// --------------------------------- //

import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { appReducer } from '@redux/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = (state, action) => {
	if (action.type === 'settingState/CLEAN_CACHE_STORAGE') {
		// todo shared variable
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const persistConfig = {
	storage,
	key: 'root',
	whitelist: ['dummy'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

export const initializeStore = (initialState) => {
	return createStore(
		persistedReducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares))
	);
};
