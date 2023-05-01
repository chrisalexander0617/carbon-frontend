import { ICarbonMonoxideData } from "../../types/carbonmonoxide"
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