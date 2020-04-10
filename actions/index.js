import * as types from '../constants/actionTypes';

export function getTreasures(treasures){
  return {
    type: types.GET_TREASURES,
    treasures,
  };
}

export function getSelectedTreasure(selectedTreasure){
  return {
    type: types.GET_SELECTEDTREASURE,
    selectedTreasure,
  };
}

export function getLoginUser(){
  return {
    type: types.GET_LOGINUSER,
  };
}

export function getLogoutUser(){
  return {
    type: types.GET_LOGOUTUSER,
  };
}
