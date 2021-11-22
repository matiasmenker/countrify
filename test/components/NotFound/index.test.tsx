/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFound from 'components/NotFound';

describe('NotFound', () => {
    it('render not found', () => {
        render(<NotFound />)
        expect(screen.getByTestId('not-found')).toBeVisible();
        expect(screen.getByRole('img')).toBeVisible();
    })
})