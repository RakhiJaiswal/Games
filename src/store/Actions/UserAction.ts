import {LOGIN_USER, LOGOUT_USER, EDIT_NAME, EDIT_PIC} from './ActionTypes';

export const LoginUserAction = (data: {}) => {
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

export const EditNameAction = (data: string) => {
  return {
    type: EDIT_NAME,
    payload: data,
  };
};

export const EditPicAction = (data: string) => {
  return {
    type: EDIT_PIC,
    payload: data,
  };
};
