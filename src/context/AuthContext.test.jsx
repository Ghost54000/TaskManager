import { fireEvent, render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

function AuthConsumer() {
    const { token, setToken } = useAuth();

    return(
        <>
            <p>{token || 'no-token'}</p>
            <button onClick={() => setToken('new-token')}>login</button>
            <button onClick={() => setToken(null)}>logout</button>
        </>
    );
}

describe('AuthContext', () => {
    it('loads the token from localStorage', () => {
        localStorage.setItem('token', 'stored-token');

        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        expect(screen.getByText('stored-token')).toBeInTheDocument();
    });

    it('updates and clears the token', () => {
        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('login'));
        expect(screen.getByText('new-token')).toBeInTheDocument();
        expect(localStorage.getItem('token')).toBe('new-token');

        fireEvent.click(screen.getByText('logout'));
        expect(screen.getByText('no-token')).toBeInTheDocument();
        expect(localStorage.getItem('token')).toBeNull();
    });
});
