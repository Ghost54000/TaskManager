import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Task from './Task';
import { del, patch } from '../services/api';

vi.mock('../services/api', () => ({
    del: vi.fn(),
    patch: vi.fn(),
}));

describe('Task', () => {
    const task = {
        id: 7,
        title: 'Tester React',
        description: 'Ajouter des tests',
        status: 'todo',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        patch.mockResolvedValue({});
        del.mockResolvedValue({});
    });

    it('marks a task as finished', async () => {
        const onUpdate = vi.fn();

        render(
            <MemoryRouter>
                <Task task={task} onUpdate={onUpdate} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Terminer'));

        expect(patch).toHaveBeenCalledWith('tasks/7', { status: 'done' });
        expect(await screen.findByText('Tester React')).toBeInTheDocument();
        expect(onUpdate).toHaveBeenCalled();
    });

    it('deletes a task', async () => {
        const onUpdate = vi.fn();

        render(
            <MemoryRouter>
                <Task task={task} onUpdate={onUpdate} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Supprimer'));

        expect(del).toHaveBeenCalledWith('tasks/7');
        expect(await screen.findByText('Tester React')).toBeInTheDocument();
        expect(onUpdate).toHaveBeenCalled();
    });
});
