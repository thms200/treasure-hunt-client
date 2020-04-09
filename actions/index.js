import * as types from '../constants/actionTypes';

export function getTreasures(treasures){
  return {
    type: types.GET_TREASURES,
    treasures,
  };
}
