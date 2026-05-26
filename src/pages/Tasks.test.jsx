import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Tasks from './Tasks';
import { get } from '../services/api';

vi.mock('../services/api', () => ({
    del: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
}));

describe('Tasks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('loads and displays tasks from the API', async () => {
        get.mockResolvedValue({
            data: [
                { id: 1, title: 'Tache terminee', description: 'Done', status: 'done' },
                { id: 2, title: 'Tache a faire', description: 'Todo', status: 'todo' },
            ],
        });

        render(
            <MemoryRouter>
                <Tasks />
            </MemoryRouter>
        );

        expect(await screen.findByText('Tache a faire')).toBeInTheDocument();
        expect(screen.getByText('Tache terminee')).toBeInTheDocument();
        expect(get).toHaveBeenCalledWith('tasks');
    });
});
