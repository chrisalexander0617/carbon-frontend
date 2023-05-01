import { ICarbonMonoxideData } from "../../types/carbonmonoxide"
import { Dispatch } from "react";
import { setCarbonMonoxideData } from "../../features/carbonmonoxide/carbonmonoxideSlice";
import axios from 'axios'

export const fetchCarbonMonoxideData = async (query: string): Promise<ICarbonMonoxideData[]> => {

  console.log('Qyery for CARBON MONOXIDE', query)
  // pass this in as a pararm
  try {
    const response = await axios.get(`http://localhost:8080/carbonmonoxide/${query}`)

    return response.data
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
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
    }
  } catch (error) {
    setError("Failed to fetch methane data");
    setLoading(false);
  }
};

