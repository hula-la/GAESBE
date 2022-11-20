import { createSlice } from '@reduxjs/toolkit';

import {
  Action,
  OfficesInterface,
  CharacterInterface,
} from '../../models/user';

interface ItemStateInterface {
  offices: OfficesInterface | null;
  characters: CharacterInterface | null;
  error: String | null;
}

const initialState: ItemStateInterface = {
  offices: null,
  characters: null,
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    // 캐릭터 불러오기
    fetchCharacterStart(state) {
      // console.log('시작');
    },
    fetchCharacterSuccess(state, action) {
      // console.log('성공', action);
      state.characters = action.payload;
    },
    fetchCharacterError(state, action) {
      // console.log('에러', action);
      state.error = action.payload.status;
    },
    // 오피스 불러오기
    fetchOfficeStart(state) {},
    fetchOfficeSuccess(state, action) {
      state.offices = action.payload;
    },
    fetchOfficeError(state, action) {
      state.error = action.payload.status;
    },
    requestBuyCharacterStart(state, action) {},
    requestBuyOfficeStart(state, action) {},
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
