import CountryRepository from 'core/repositories/CountryRepository';
import Country from 'core/entities/Country';
import Language from 'core/entities/Language';
import axios, { AxiosError } from 'axios';
import { ErrorResponseType, HttpResponse } from 'core/entities/Response';

type CountryJson = {
    name: {
        common: string;
        official: string;
        nativeName: {}
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {};
    idd: {};
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: {};
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: {};
    flag: string;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    population: number;
    fifa: string;
    car: {};
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
        svg: string;
    };
    coatOfArms: {};
    startOfWeek: string;
    capitalInfo: {
        latlng: number[];
    };
};

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1';

class RestCountryData implements CountryRepository {
    public async all() {
        try {
            const { data, status, statusText } = await axios.get(`${REST_COUNTRIES_URL}/all`);
            const countries = data.map(asCountry);
            return new HttpResponse<Country[]>(status, statusText, countries);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                return new HttpResponse<ErrorResponseType>(err.response.status, err.response.statusText);
            } else {
                return new HttpResponse<ErrorResponseType>(400, 'Bad Request');
            }
        }
    }

    public async getByCode(code: string) {
        try {
            const { data, status, statusText } = await axios.get(`${REST_COUNTRIES_URL}/alpha/${code}`);
            const countries = asCountry(data[0]);
            return new HttpResponse<Country>(status, statusText, countries);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                return new HttpResponse<ErrorResponseType>(err.response.status, err.response.statusText);
            } else {
                return new HttpResponse<ErrorResponseType>(400, 'Bad Request');
            }
        }
    }
}

export const asCountry = (country: CountryJson) => {
    return new Country(
        country.name.common,
        country.cca2,
        country.region,
        country.subregion,
        country.flags.svg,
        country.maps.googleMaps,
        formatPopulation(country.population),
        country.languages ? Object.values(country.languages).map((language: string) => new Language(language)) : null,
        country.capital ? country.capital[0] : null
    );
};

const formatPopulation = (number: number) => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

export default RestCountryData;
