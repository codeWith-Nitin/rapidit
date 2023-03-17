import { combineReducers } from 'redux';
import auth from '@redux/auth';

export const appReducer = combineReducers({
	auth,
});
