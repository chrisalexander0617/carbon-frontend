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
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something else went wrong');
    }
  }
}

export const getCarbonMonoxideData = async (
  dispatch: Dispatch<any>,
  countryCode: string,
  setError: Dispatch<any>,
  setLoading: Dispatch<boolean>
): Promise<void> => {
  setLoading(true);
  
  try {
    const result = await fetchCarbonMonoxideData(countryCode);

    if(result.length < 1){
      setError('No data available')
    } else {
      dispatch(setCarbonMonoxideData(result));
      setLoading(false);
      setError(null)
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      setError("Server Error: Failed to fetch data");
    }
  }
};

