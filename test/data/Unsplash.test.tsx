/**
 * @jest-environment jsdom
 */

import React from 'react'
import UnsplashData from 'data/UnsplashData';
import axios from 'axios';
import Image from 'core/entities/Image';

import { mockImages } from '../mock/images';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => mockedAxios.get.mockClear())

describe("UnsplashData.all", () => {
    test('should return Image entity when API returns 200', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockImages, status: 200, statusText: 'test' });
        const restUnsplashData = new UnsplashData();
        const restUnsplashDataResult = await restUnsplashData.search('test');
        const resultWithFormat = restUnsplashDataResult.format();
        expect(resultWithFormat).toEqual(new Image(
            mockImages.results[0].urls.full,
            mockImages.results[0].urls.regular,
            mockImages.results[0].alt_description
        ))
    });

    test('should return error when API returns 404', async () => {
        mockedAxios.get.mockRejectedValue({ response: { status: 404, statusText: 'test' }});
        const restUnsplashData = new UnsplashData();
        const restUnsplashDataResult = await restUnsplashData.search('test');
        expect(restUnsplashDataResult.isError()).toBeTruthy();
    });
});