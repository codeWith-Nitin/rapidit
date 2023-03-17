import { createAction } from 'redux-actions';

const initialState = {
	isAuthenticated: false,
};

// const
export const AuthRdxConst = 'AuthState/AuthRdxConst';

// action creator
export const updateAuthAction = createAction(AuthRdxConst, (data) => data);

// Make sure reducer is added to lib/reducers namespace
function stateReducer(state = initialState, action) {
	switch (action.type) {
		case AuthRdxConst:
			return {
				...action.payload,
			};
		default:
			return state;
	}
}

export default stateReducer;
