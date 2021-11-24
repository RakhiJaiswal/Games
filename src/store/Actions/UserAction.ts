import {LOGIN_USER, LOGOUT_USER, EDIT_NAME} from './ActionTypes';

export const LoginUserAction = data => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const LogoutUserAction = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const EditNameAction = data => {
  return {
    type: EDIT_NAME,
    payload: data,
  };
};
