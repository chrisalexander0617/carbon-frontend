import { IMethaneData } from "../../types/methane"
import axios from 'axios'

export const fetchMethaneData = async (): Promise<IMethaneData[]> => {
  try {
    const response = await axios.get('http://localhost:8080/methane')
    return response.data
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}