import axios from 'axios'
import { ICountryLables, ICountriesData } from '../../types/countries'

export const fetchCountriesData = async (): Promise<ICountriesData> => {
  try {
    const response = await axios.get('http://localhost:8080/countries')

    return response.data
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export const fetchCountryLables = async (): Promise<string[]> => {
  try {
    const response = await axios.get('http://localhost:8080/countries')
    const responseInArrayFormat = Object.keys(response.data).map(key => key)

    return responseInArrayFormat
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}