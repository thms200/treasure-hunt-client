import { GET_TREASURES } from '../constants/actionTypes';

const initialState = {
  treasures: [],
};

export default function treasures(state = initialState, action) {
  switch (action.type) {
    case GET_TREASURES:
      return { ...state, treasures: action.treasures };
    // case GET_REPOS_SUCCESS:
    //   return { ...state, loading: false, repos: action.payload.data };
    // case GET_REPOS_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: 'Error while fetching repositories'
    //   };
    default:
      return state;
  }
}
