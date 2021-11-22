/**
 * @jest-environment jsdom
 */

import React from 'react';
import RestCountryData from 'data/RestCountryData';
import axios from 'axios';
import Country from 'core/entities/Country';
import Language from 'core/entities/Language';

import { mockCountries } from '../mock/countries';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const expectedSpain = new Country(
    'Spain',
    'ES',
    'Europe',
    'Southern Europe',
    'https://flagcdn.com/es.svg',
    'https://goo.gl/maps/138JaXW8EZzRVitY9',
    '47.351.567',
    [new Language('Spanish')],
    'Madrid'
);

const expectedIreland = new Country(
    'Ireland',
    'IE',
    'Europe',
    'Northern Europe',
    'https://flagcdn.com/ie.svg',
    'https://goo.gl/maps/hxd1BKxgpchStzQC6',
    '4.994.724',
    [new Language('English'), new Language('Irish')],
    'Dublin'
);

afterEach(() => mockedAxios.get.mockClear());

describe('RestCountryData.all', () => {
    test('should return Ireland and Spain Country entities when API returns 200', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockCountries, status: 200, statusText: 'test' });
        const restCountryData = new RestCountryData();
        const restCountryDataResult = await restCountryData.all();
        const resultWithFormat = restCountryDataResult.format();
        expect(resultWithFormat).toHaveLength(2);
        expect(resultWithFormat[0]).toEqual(expectedSpain);
        expect(resultWithFormat[1]).toEqual(expectedIreland);
        expect(restCountryDataResult.isSuccess()).toBeTruthy();
    });

    test('should return error when API returns 404', async () => {
        mockedAxios.get.mockRejectedValue({ response: { status: 404, statusText: 'test' } });
        const restCountryData = new RestCountryData();
        const restCountryDataResult = await restCountryData.all();
        expect(restCountryDataResult.isError()).toBeTruthy();
    });
});

describe('RestCountryData.getByCode', () => {
    test('should return Spain Country entity when API returns 200', async () => {
        mockedAxios.get.mockResolvedValue({ data: [mockCountries[0]], status: 200, statusText: 'test' });
        const restCountryData = new RestCountryData();
        const restCountryDataResult = await restCountryData.getByCode('es');
        const resultWithFormat = restCountryDataResult.format();
        expect(resultWithFormat).toEqual(expectedSpain);
    });

    test('should return error when API returns 404', async () => {
        mockedAxios.get.mockRejectedValue({ response: { status: 404, statusText: 'test' } });
        const restCountryData = new RestCountryData();
        const restCountryDataResult = await restCountryData.getByCode('es');
        expect(restCountryDataResult.isError()).toBeTruthy();
    });
});
