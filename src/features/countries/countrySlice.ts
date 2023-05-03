import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICountriesData } from '../../types/countries'

const initialState = { 
  value: {} as ICountriesData,
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