import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { get } from "../services/api";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const sortedTasks = [...tasks].sort((a, b) => {
        const aIsDone = a.status === 'done' || a.status === 'Terminé';
        const bIsDone = b.status === 'done' || b.status === 'Terminé';

        return Number(aIsDone) - Number(bIsDone);
    });

    const fetchTasks = async () => {
        const result = await get('tasks');
        setTasks(result.data);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <>
            <div className="flex flex-row justify-between content-stretch w-full">
                <h2>Mes tâches</h2>
                <Link className="border border-neutral-600 text-white rounded-xl px-4 py-1" to="/create">+ Ajouter une tâche</Link>
            </div>

            {sortedTasks.map(task => (
                <Task key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
        </>
    )
}
