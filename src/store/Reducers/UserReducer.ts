import {USER} from '../Actions/ActionTypes';

const initialState = {
  userType: 'guest', // guest or non-guest
  loggedIn: false,
};

export const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        userType: action.payload.userType,
        loggedIn: true,
      };
    default:
      return state;
  }
};
