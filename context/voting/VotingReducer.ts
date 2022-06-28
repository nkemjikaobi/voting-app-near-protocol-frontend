import {
	CHECK_IF_SIGNED_IN,
	CONNECT_TO_NEAR,
	GET_ALL_ELECTIONS,
	GET_BALANCE,
	GET_USER_ELECTIONS,
	LOAD_CONTRACT,
	LOGOUT,
} from '../types';

const VotingReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_TO_NEAR:
			return {
				...state,
				wallet: action.payload,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
			};
		case GET_BALANCE:
			return {
				...state,
				balance: action.payload,
			};
		case CHECK_IF_SIGNED_IN:
			return {
				...state,
				isSignedIn: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				balance: '',
				isSignedIn: false,
			};
		case GET_USER_ELECTIONS:
			return {
				...state,
				userElections: action.payload,
			};
		case GET_ALL_ELECTIONS:
			return {
				...state,
				allElections: action.payload,
			};
		default:
			return state;
	}
};
export default VotingReducer;
