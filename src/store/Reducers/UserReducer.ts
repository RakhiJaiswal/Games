import {LOGIN_USER, LOGOUT_USER} from '../Actions/ActionTypes';

const initialState = {
  userType: '', // guest or non-guest
  loggedIn: false,
  userData: {}, // to be used later for google & fb signin
};

export const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userType: action.payload.userType,
        loggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userType: '',
        loggedIn: false,
      };
    default:
      return state;
  }
};
