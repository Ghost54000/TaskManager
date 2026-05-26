import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, patch } from "../services/api";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [error, setError] = useState(false);

    useEffect(() => {
        get('tasks/' + id).then(result => {
            setTitle(result.data.title);
            setDescription(result.data.description);
            setStatus(result.data.status || 'todo');
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description)
            return;

        try {
            await patch('tasks/' + id, {
                title,
                description,
                status
            });
            setError(false);
            navigate('/tasks');
        }catch(err){
            console.log(err);
            setError(true);
        }
    }

    return(
        <>
            <div>Modifier la tache "{title}"</div>
            <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
                {error && <p className="error-form">Impossible de modifier la tache</p>}
                <input className="w-full rounded-lg border border-white px-3 py-2" placeholder="Titre de la tache" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea className="w-full rounded-lg border border-white px-3 py-2" placeholder="Description de la tache" value={description} onChange={(e) => setDescription(e.target.value)} required>

                </textarea>
                <select className="w-full rounded-lg border border-white px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="todo">À faire</option>
                    <option value="done">Terminée</option>
                </select>
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">Modifier</button>
            </form>
        </>
    )
}
