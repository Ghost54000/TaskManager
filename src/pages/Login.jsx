import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { post } from "../services/api";

export default function Login() {
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password)
            return;
        try {
            const result = await post('login', {email, password});
            setToken(result.data.accessToken);
            setError(false);
            navigate('/tasks');
        }catch(err){
            console.log(err);
            setError(true);
        }
    }

    return(
        <>
            <h2 className="w-full">Connexion</h2>
            <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}> 
                {error && <p className="error-form">Identifiants invalides</p>}
                <input className="w-full rounded-lg border border-white px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full rounded-lg border border-white px-3 py-2" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">Se connecter</button>
            </form>
        </>
    );
}
