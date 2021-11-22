/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Countries, { getStaticProps } from 'pages'

import { mockCountries } from '../mock/countries';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => mockedAxios.get.mockClear())

describe("Countries page ( integration )", () => {
    test('should show 2 country items when return 200', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockCountries, status: 200, statusText: 'test' });
        const { props } = await getStaticProps();
        render(<Countries { ...props }/>);
        expect(screen.getAllByRole('listitem')).toHaveLength(mockCountries.length);
        expect(screen.getByTestId('country-spain')).toBeVisible();
        expect(screen.getByTestId('country-ireland')).toBeVisible();
    });
    test('should show correct spain item country when search "spain"', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockCountries, status: 200, statusText: 'test' });
        const { props } = await getStaticProps();
        render(<Countries { ...props }/>);
        const input = screen.getByRole('search');

        fireEvent.change(input, { target: { value: 'spain' } });
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
    test('should show correct ireland item country when search "ireland"', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockCountries, status: 200, statusText: 'test' });
        const { props } = await getStaticProps();
        render(<Countries { ...props }/>);
        const input = screen.getByRole('search');

        fireEvent.change(input, { target: { value: 'ireland' } });
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
    test('should show not found image when not found any search', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockCountries, status: 200, statusText: 'test' });
        const { props } = await getStaticProps();
        render(<Countries { ...props }/>);
        const input = screen.getByRole('search');

        fireEvent.change(input, { target: { value: 'test' } });
        expect(screen.getByTestId('not-found')).toBeVisible();
    });
    test('should show the error page when return 404', async () => {
        mockedAxios.get.mockRejectedValue({ response: { status: 404, statusText: 'test' }});
        const { props } = await getStaticProps();
        render(<Countries { ...props }/>);
        expect(screen.getByTestId('page-404')).toBeVisible();
    });
});