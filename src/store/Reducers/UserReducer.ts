import {LOGIN_USER, LOGOUT_USER} from '../Actions/ActionTypes';

const initialState = {
  userType: '',
  loggedIn: false,
  userData: {},
};

export const UserDetailsReducer = (state = initialState, action) => {
  console.log(action, 'action ');
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userType: action.payload.userType,
        loggedIn: true,
        userData: action.payload.userData || {},
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
