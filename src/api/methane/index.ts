import { IMethaneData } from "../../types/methane"
import axios from 'axios'

export const fetchMethaneData = async (query: string): Promise<IMethaneData[]> => {
  console.log('frontend methane api')

  try {
    const response = await axios.get('http://localhost:8080/methane/', {
      params: {
        q: query
      }
    })

    console.log('response from our backend', response.data)

    console.log('We got a response from the server')

    return response.data
    
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}