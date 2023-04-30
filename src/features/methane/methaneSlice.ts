import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMethaneData } from '../../types/methane'

interface MethaneState {
  value: IMethaneData[]
}

const initialState: MethaneState = { 
  value: []
}

export const methaneSlice = createSlice({
  name:'methane',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IMethaneData[]>) => {
      state.value = action.payload
    }
  }
})

export const { set } = methaneSlice.actions

export default methaneSlice.reducer