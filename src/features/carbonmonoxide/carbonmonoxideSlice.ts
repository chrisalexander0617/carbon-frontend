import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICarbonMonoxideData } from '../../types/carbonmonoxide'

interface CarbonMonoxideState {
  value: ICarbonMonoxideData[]
}

const initialState: CarbonMonoxideState = { 
  value: []
}

export const carbonmonoxideSlice = createSlice({
  name:'carbonmonoxide',
  initialState,
  reducers: {
    setCarbonMonoxideData: (state, action: PayloadAction<ICarbonMonoxideData[]>) => {
      state.value = action.payload
    }
  }
})

export const { setCarbonMonoxideData } = carbonmonoxideSlice.actions

export default carbonmonoxideSlice.reducer