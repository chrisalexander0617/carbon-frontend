import { ICarbonMonoxideData } from "../../types/carbonmonoxide"
import { Dispatch } from "react";
import { setCarbonMonoxideData } from "../../features/carbonmonoxide/carbonmonoxideSlice";
import axios from 'axios'
import process from 'process';

export const fetchCarbonMonoxideData = async (query: string): Promise<ICarbonMonoxideData[]> => {
  
  if (!query || /[^\w\s-]/.test(query)) {
    throw new Error('Invalid query parameter');
  }

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/carbonmonoxide/${query}`)
    return data
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error', err.message)
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something else went wrong');
    }
  }
}

export const getCarbonMonoxideData = async (
  mounted: { current: boolean },
  dispatch: Dispatch<any>,
  countryCode: string,
  setError: Dispatch<any>,
  setLoading: Dispatch<boolean>
): Promise<void> => {
  setLoading(true);
  
  try {
    const result = await fetchCarbonMonoxideData(countryCode);

    if (mounted.current) {
      dispatch(setCarbonMonoxideData(result));
      setLoading(false);
      setError(null)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error', error.message)
    }

    setError("Server Error: Failed to fetch data");
    setLoading(false);
  }
};

