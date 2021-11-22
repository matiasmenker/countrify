/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import HeaderImage from 'components/HeaderImage';

describe('HeaderImage', () => {
    it('should show the title', () => {
        render(<HeaderImage />);
        expect(screen.getByText('Countrify.')).toBeVisible();
    })
})