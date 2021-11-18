import {LOGIN_USER, LOGOUT_USER} from './ActionTypes';

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
