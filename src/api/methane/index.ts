import { IMethaneData } from "../../types/methane"
import { set as setMethaneData } from "../../features/methane/methaneSlice";
import { Dispatch } from "react";
import axios from 'axios'
import process from 'process';

export const fetchMethaneData = async (query: string): Promise<IMethaneData[]> => {
  try {
    const { data }= await axios.get(`${process.env.REACT_APP_BASE_URL}/methane/${query}`)
    console.log('API: REsponse =>', data)
    return data
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export const getMethaneData = async (
  mounted: { current: boolean },
  dispatch: Dispatch<any>,
  countryCode: string,
  setError: Dispatch<any>,
  setLoading: Dispatch<boolean>
): Promise<void> => {
  setLoading(true);

  try {
    const result = await fetchMethaneData(countryCode);

    if (mounted.current) {
      if(result.length < 1) {
        setError('No data available')
      } else {
        dispatch(setMethaneData(result));
        setLoading(false);
        setError(null)
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error', error.message)
      setError("Server Error: Failed to fetch data");
    }
  }
};