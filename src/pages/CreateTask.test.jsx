import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import CreateTask from './CreateTask';
import { post } from '../services/api';

vi.mock('../services/api', () => ({
    post: vi.fn(),
}));

describe('CreateTask', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates a task and redirects to the task list', async () => {
        post.mockResolvedValue({});

        render(
            <MemoryRouter initialEntries={['/create']}>
                <Routes>
                    <Route path="/create" element={<CreateTask />} />
                    <Route path="/tasks" element={<p>Tasks page</p>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Tile de la/), {
            target: { value: 'Nouvelle tache' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Description de la/), {
            target: { value: 'Details' },
        });
        fireEvent.click(screen.getByText('Ajouter'));

        await waitFor(() => {
            expect(post).toHaveBeenCalledWith('tasks', {
                title: 'Nouvelle tache',
                description: 'Details',
                status: 'todo',
            });
            expect(screen.getByText('Tasks page')).toBeInTheDocument();
        });
    });
});
