import { IMethaneData } from "../../types/methane"
import { set as setMethaneData } from "../../features/methane/methaneSlice";
import { Dispatch } from "react";
import axios from 'axios'

export const fetchMethaneData = async (query: string): Promise<IMethaneData[]> => {
  console.log('QUERY', query)
  try {
    const response = await axios.get(`http://localhost:8080/methane/${query}`)
    console.log('Methane Data', response.data)
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
    setError("Failed to fetch methane data");
    setLoading(false);
  }
};