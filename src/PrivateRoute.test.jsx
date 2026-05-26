import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';

function renderPrivateRoute() {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={['/tasks']}>
                <Routes>
                    <Route path="/login" element={<p>Login page</p>} />
                    <Route path="/tasks" element={<PrivateRoute><p>Private page</p></PrivateRoute>} />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

describe('PrivateRoute', () => {
    it('renders children when the user has a token', () => {
        localStorage.setItem('token', 'valid-token');

        renderPrivateRoute();

        expect(screen.getByText('Private page')).toBeInTheDocument();
    });

    it('redirects to login when the user has no token', () => {
        renderPrivateRoute();

        expect(screen.getByText('Login page')).toBeInTheDocument();
    });
});
