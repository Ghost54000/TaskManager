import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import EditTask from './EditTask';
import { get, patch } from '../services/api';

vi.mock('../services/api', () => ({
    get: vi.fn(),
    patch: vi.fn(),
}));

describe('EditTask', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('loads a task, updates it, and redirects to the task list', async () => {
        get.mockResolvedValue({
            data: {
                title: 'Ancien titre',
                description: 'Ancienne description',
            },
        });
        patch.mockResolvedValue({});

        render(
            <MemoryRouter initialEntries={['/edit/4']}>
                <Routes>
                    <Route path="/edit/:id" element={<EditTask />} />
                    <Route path="/tasks" element={<p>Tasks page</p>} />
                </Routes>
            </MemoryRouter>
        );

        const titleInput = await screen.findByDisplayValue('Ancien titre');
        fireEvent.change(titleInput, {
            target: { value: 'Nouveau titre' },
        });
        fireEvent.change(screen.getByDisplayValue('Ancienne description'), {
            target: { value: 'Nouvelle description' },
        });
        fireEvent.click(screen.getByText('Modifier'));

        await waitFor(() => {
            expect(get).toHaveBeenCalledWith('tasks/4');
            expect(patch).toHaveBeenCalledWith('tasks/4', {
                title: 'Nouveau titre',
                description: 'Nouvelle description',
            });
            expect(screen.getByText('Tasks page')).toBeInTheDocument();
        });
    });
});
