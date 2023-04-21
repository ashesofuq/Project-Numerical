import { describe, expect, afterEach, test } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Bisection from '../Components/Bisection';

describe('Renders Bisection Method page correctly', async () => {

    afterEach(() => {
        cleanup();
    });

    test('Should render the page correctly', async () => {
        // Setup
        render(<Bisection />);
        const h2 = await screen.getByText('Bisection Method');

        // Expectations
        expect(h2).toBeInTheDocument();
    });

    test('Should show the Answer is 0', async () => {
        // Setup
        await render(<Bisection />);        

        // Pre Expectations
        const button = await screen.getByText('Calculate');
        expect(button).toBeInTheDocument();

        // Actions
        fireEvent.click(button);

        // Post Expectations
        const answer = await screen.getByText('Answer = 0.000000');
        expect(answer).toBeInTheDocument();
    });

    test('Should show the Answer is 1.898829', async () => {
        // Setup
        await render(<Bisection />);        

        // Pre Expectations
        const inputFx = await screen.getByTestId('equation');
        fireEvent.change(inputFx, { target: { value: '(x^4)-13' } });
        expect(inputFx.value).toBe('(x^4)-13');

        const inputXL = await screen.getByTestId('XL');
        fireEvent.change(inputXL, { target: { value: '0' } });
        expect(inputXL.value).toBe('0');

        const inputXR = await screen.getByTestId('XR');
        fireEvent.change(inputXR, { target: { value: '2' } });
        expect(inputXR.value).toBe('2');

        const button = await screen.getByText('Calculate');
        expect(button).toBeInTheDocument();

        // Actions
        fireEvent.click(button);

        // Post Expectations
        const answer = await screen.findByText('Answer = 1.898829');
        expect(answer).toBeInTheDocument();
    });
});