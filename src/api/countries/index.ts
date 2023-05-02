import axios from 'axios'
import { ICountriesData } from '../../types/countries'
import { Dispatch, SetStateAction, MutableRefObject } from "react";
import process from 'process';

export const fetchCountriesData = async (): Promise<ICountriesData> => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/countries`)

    return response.data
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Something went wrong: ' + err.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export const getCountriesData = async (
  mounted: MutableRefObject<boolean>,
  dispatch: Dispatch<any>,
  setError: Dispatch<SetStateAction<string | null>>,
  setCountryState: Dispatch<SetStateAction<ICountriesData>>
): Promise<void> => {
  try {
    mounted.current = true;
    const result = await fetchCountriesData();

    if (mounted.current) {
      dispatch(setCountryState(result));
    }
  } catch (error) {
    setError("Server error: Unable to fetch data");
  }
};