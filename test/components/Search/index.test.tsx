/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryItem from 'components/CountryItem';
import Country from 'core/entities/Country';
import Language from 'core/entities/Language';

const MockCountry = new Country(
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

describe('CountryItem', () => {
    it('should show the country population', () => {
        render(<CountryItem country={MockCountry} />);
        expect(screen.getByText(MockCountry.population)).toBeVisible();
    });
    it('should show the country name', () => {
        render(<CountryItem country={MockCountry} />);
        expect(screen.getByText(MockCountry.name)).toBeVisible();
    });
    it('should show the country image', () => {
        render(<CountryItem country={MockCountry} />);
        expect(screen.getByRole('img')).toHaveAttribute('alt', MockCountry.name);
        expect(screen.getByRole('img')).toBeVisible();
    });
});
