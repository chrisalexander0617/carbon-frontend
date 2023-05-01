import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = { 
  value: {} as any
}

export const countrySlice = createSlice({
  name:'countries',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const { setCountry } = countrySlice.actions

export default countrySlice.reducer