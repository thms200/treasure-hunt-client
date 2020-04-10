import { GET_LOGINUSER, GET_LOGOUTUSER } from '../constants/actionTypes';

const initialState = {
  isLogin: false,
};

export default function treasures(state = initialState, action) {
  switch (action.type) {
    case GET_LOGINUSER:
      return { isLogin: true };
    case GET_LOGOUTUSER:
      return { isLogin: false };
    default:
      return state;
  }
}
