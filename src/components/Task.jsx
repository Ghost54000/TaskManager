import { Link } from "react-router-dom";
import { del, patch } from "../services/api";

export default function Task({ task, onUpdate }) {
    const isDone = task.status === 'done' || task.status === 'Terminé';
    const markAsFinished = async () => {     
        await patch('tasks/' + task.id, {status: 'done'});
        onUpdate();
    }
    
    const deleteTask = async () => {
        await del('tasks/' + task.id);
        onUpdate();
    }

    return(
        <div className="border border-neutral-600 rounded-xl p-6 flex flex-row justify-between content-stretch w-full">
            <div className="text-left text-white">
                <div className="flex flex-row">
                    <span className={`${isDone ? 'bg-green-600' : 'bg-violet-600'} px-4 py-1 text-white rounded-sm mr-6`}>{isDone ? 'Terminé' : 'À faire'}</span>
                    <h3 className="text-xl font-bold">{task.title}</h3>
                </div>
                <div className="mt-2">
                    <p>{task.description}</p>
                </div>
            </div>
            <div className="content-center">
                {!isDone && <button className="bg-green-600 px-4 mx-2 py-1 text-white rounded-sm" onClick={() => markAsFinished()}>Terminer</button>}
                <Link className="bg-yellow-400 px-4 py-1 mx-2 text-white rounded-sm" to={`/edit/${task.id}`}>Modifier</Link>
                <button className="bg-red-600 px-4 py-1 mx-2 text-white rounded-sm" onClick={() => deleteTask()}>Supprimer</button>
            </div>
        </div>
    )
}
