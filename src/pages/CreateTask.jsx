import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";

export default function CreateTask() {
    
    const navigate = useNavigate();

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description)
            return;

        try {
            await post('tasks', {
                title,
                description,
                status: 'todo'
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
        <div>Créer une tâche</div>
        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}> 
                {error && <p className="error-form">Impossible d'ajouter la tÃ¢che</p>}
                <input className="w-full rounded-lg border border-white px-3 py-2" placeholder="Tile de la tâche" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea className="w-full rounded-lg border border-white px-3 py-2" type="text" placeholder="Description de la tâche" value={description} onChange={(e) => setDescription(e.target.value)} required>

                </textarea>
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">Ajouter</button>
        </form>
        </>
    )
}
