import {USER} from './ActionTypes';
export const UserAction = data => {
  return {
    type: USER,
    payload: data,
  };
};
