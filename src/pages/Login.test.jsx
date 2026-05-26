import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';
import { post } from '../services/api';

vi.mock('../services/api', () => ({
    post: vi.fn(),
}));

describe('Login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('stores the token and redirects after a successful login', async () => {
        post.mockResolvedValue({ data: { accessToken: 'abc-token' } });

        render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/tasks" element={<p>Tasks page</p>} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'user@test.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'secret' },
        });
        fireEvent.click(screen.getByText('Se connecter'));

        await waitFor(() => {
            expect(post).toHaveBeenCalledWith('login', {
                email: 'user@test.com',
                password: 'secret',
            });
            expect(localStorage.getItem('token')).toBe('abc-token');
            expect(screen.getByText('Tasks page')).toBeInTheDocument();
        });
    });
});
