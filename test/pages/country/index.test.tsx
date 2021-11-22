/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import CountryDetail, { getStaticProps } from 'pages/country/[id]'

import { mockSpain } from '../../mock/countries';
import { mockImages } from '../../mock/images';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CountryDetail page ( integration )", () => {
    test('should show a country when return 200', async () => {
        mockedAxios.get.mockImplementation((url) => {
            switch (url) {
                case "https://restcountries.com/v3.1/alpha/es":
                    return Promise.resolve({ data: [ mockSpain ], status: 200, statusText: 'test' });
                case "https://api.unsplash.com/search/photos":
                    return Promise.resolve({ data: mockImages, status: 200, statusText: 'test' })
                default:
                    return Promise.reject(new Error("not found"))
            }
        })
        const { props } = await getStaticProps({
            params: {
                id: 'es'
            }
        });
        render(<CountryDetail { ...props }/>);
        expect(screen.getByTestId('image-country')).toBeVisible();
        expect(screen.getByTestId('image-country')).toHaveAttribute('alt', mockSpain.name.common);
        expect(screen.getByText(mockSpain.name.common)).toBeVisible();
        expect(screen.getByText('47.351.567')).toBeVisible();
        expect(screen.getByText(`${mockSpain.capital[0]}, ${mockSpain.name.common}`)).toBeVisible();
    });
    test('should show the error page when return 404', async () => {
        mockedAxios.get.mockImplementation((url) => {
            switch (url) {
                case "https://restcountries.com/v3.1/alpha/es":
                    return Promise.resolve({ response: { status: 404, statusText: 'test' }});
                case "https://api.unsplash.com/search/photos":
                    return Promise.resolve({ response: { status: 404, statusText: 'test' }})
                default:
                    return Promise.reject(new Error("not found"))
            }
        })
        const { props } = await getStaticProps({
            params: {
                id: 'es'
            }
        });
        render(<CountryDetail { ...props }/>);
        expect(screen.getByTestId('page-404')).toBeVisible();
    });
});