import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Register from './Register';
import { post } from '../services/api';

vi.mock('../services/api', () => ({
    post: vi.fn(),
}));

describe('Register', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates an account and redirects to login', async () => {
        post.mockResolvedValue({});

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<p>Login page</p>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'user@test.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'secret' },
        });
        fireEvent.click(screen.getByText("S'inscrire"));

        await waitFor(() => {
            expect(post).toHaveBeenCalledWith('register', {
                email: 'user@test.com',
                password: 'secret',
            });
            expect(screen.getByText('Login page')).toBeInTheDocument();
        });
    });
});
