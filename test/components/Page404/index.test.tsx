/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Page404 from 'components/Page404';

describe('Page404', () => {
    it('render page 404', () => {
        render(<Page404 />)
        expect(screen.getByTestId('page-404')).toBeVisible();
        expect(screen.getByRole('img')).toBeVisible();
    })
})