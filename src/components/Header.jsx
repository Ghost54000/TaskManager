import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        setToken(null);
        navigate('/login');
    }
    
    return(
        <header className='bg-blue-500 text-white py-2'>
            <div className='flex flex-row justify-between items-center max-w-337.5 m-auto'>
                <div>
                    <p className='text-2xl font-extrabold'>Task Manager</p>
                </div>
                <nav>
                    <Link to="/">Accueil</Link>
                    {token && <Link to="/tasks">Taches</Link>}
                    {!token && <Link to="/login">Connexion</Link>}
                    {!token && <Link to="/register">Inscription</Link>}
                    {token && <button onClick={handleLogout}>Deconnexion</button>}
                </nav>
            </div>
        </header>
    )
}

export default Header
