import axios from 'axios'

//eventually we need to match a typed in country in case sure 

export const fetchCountriesData = async (): Promise<string[]> => {
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