import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = { 
  value: 'US'
}

export const countrycodeSlice = createSlice({
  name:'countryCode',
  initialState,
  reducers: {
    setCountryCode: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const { setCountryCode } = countrycodeSlice.actions

export default countrycodeSlice.reducer