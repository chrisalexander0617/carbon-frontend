import { IMethaneData } from "../../types/methane"
import { set as setMethaneData } from "../../features/methane/methaneSlice";
import { Dispatch } from "react";
import axios from 'axios'
import process from 'process';

export const fetchMethaneData = async (query: string): Promise<IMethaneData[]> => {
  console.log('Fetching Methane Data', process.env.REACT_APP_BASE_URL);
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/methane/${query}`)
    return response.data
    
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
      dispatch(setMethaneData(result));
      setLoading(false);
      setError(null)
    }
  } catch (error) {
    setError("Server Error: Failed to fetch data");
    setLoading(false);
  }
};