import {
  EDIT_NAME,
  EDIT_PIC,
  LOGIN_USER,
  LOGOUT_USER,
} from '../Actions/ActionTypes';

const initialState = {
  userType: '',
  loggedIn: false,
  userData: {},
};

export const UserDetailsReducer = (
  state = initialState,
  action: {payload: {userType: string; userData: {}}; type: string},
) => {
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
    case EDIT_NAME:
      return {
        ...state,
        userData: {...state.userData, displayName: action.payload},
      };
    case EDIT_PIC:
      return {
        ...state,
        userData: {...state.userData, photoURL: action.payload},
      };
    default:
      return state;
  }
};
