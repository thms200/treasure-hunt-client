import { GET_TREASURES, GET_SELECTEDTREASURE } from '../constants/actionTypes';

const initialState = {
  treasures: [],
  selectedTreasure: {},
};

export default function treasures(state = initialState, action) {
  switch (action.type) {
    case GET_TREASURES:
      return { ...state, treasures: action.treasures };
    case GET_SELECTEDTREASURE:
      return { ...state, selectedTreasure: action.selectedTreasure };
    default:
      return state;
  }
}
