import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { login } from '../../Components/actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const token = useSelector((state) => state.login.token);
    const error = useSelector((state) => state.login.error);
    
    // Effet pour récupérer les informations d'identification stockées lors du chargement du composant
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe');

        if (storedEmail && storedPassword && storedRememberMe) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(storedRememberMe === 'true');
        }
    }, []);

    // Gérer le changement de la case à cocher "Se souvenir de moi"
    const handleRememberMeChange = (e) => {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);

        // Stocker ou supprimer les informations d'identification en fonction de l'état de la case à cocher
        if (isChecked) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', true);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
    };

    // Gérer la soumission du formulaire de connexion
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password, rememberMe));

        // Rediriger l'utilisateur vers la page utilisateur après la connexion réussie
        if (token !== null) {
            navigate('/User');
        }
    };
    
    return (
        <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button" type="submit">Login</button>
            </form>
        </section>
    );
}

export default Form;
