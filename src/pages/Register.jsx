import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";

export default function Register() {
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password)
            return;
        await post('register', {email, password});
        navigate('/login');
    }

    return(
        <>
            <h2 className="w-full">Inscription</h2>
            <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}> 
                <input className="w-full rounded-lg border border-white px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full rounded-lg border border-white px-3 py-2" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">S'inscrire</button>
            </form>
        </>
    );
}
