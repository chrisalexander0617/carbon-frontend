import { IMethaneData } from "../../types/methane"
import axios from 'axios'

export const fetchMethaneData = async (query: string): Promise<IMethaneData[]> => {

  try {
    console.log('calling')
    const response = await axios.get('http://localhost:8080/methane', {
      params: {
        query: query
      }
    })

    return response.data
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}