import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import auth_service from '../../Components/actions/authActions';
import { logoClick } from '../../Components/slices/loginSlice';

/**
 * Composant représentant la barre de navigation.
 * @returns {JSX.Element} - Élément React représentant la barre de navigation.
 */
const Nav = () => {
  // Récupération des données de l'utilisateur depuis le store Redux
  const user = useSelector((state) => state.user);
  // Récupération du statut d'authentification depuis le store Redux
  const isAuth = useSelector((state) => state.login.isAuth);
  // Dispatch Redux pour effectuer des actions
  const dispatch = useDispatch();
  // Hook de navigation pour la navigation programmative
  const navigate = useNavigate();

  // Fonction appelée lors du clic sur le bouton de déconnexion
  const onLogout = () => {
    dispatch(auth_service.logout()); // Déconnexion de l'utilisateur
    navigate('/'); // Redirection vers la page d'accueil
  }

  // Fonction appelée lors du clic sur le logo
  const onLogoClick = () => {
    dispatch(logoClick()); // Enregistrement du clic sur le logo
  }
  
  return (
    <nav className="main-nav">
      {/* Logo d'Argent Bank avec un lien vers la page d'accueil */}
      <Link className="main-nav-logo" onClick={onLogoClick} to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {/* Affichage des liens de navigation en fonction du statut d'authentification */}
      {isAuth === false ? (
        // Si l'utilisateur n'est pas connecté, afficher le lien vers la page de connexion
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div> 
      ) : isAuth === true ? (
        // Si l'utilisateur est connecté, afficher le lien vers le profil et le bouton de déconnexion
        <div className='main-nav-items'>
          <Link className="main-nav-item" to="/User">
            <i className="fa fa-user-circle"></i>
            {user.firstName} {/* Afficher le prénom de l'utilisateur */}
          </Link>
          <span className="main-nav-item" onClick={onLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </span>
        </div>
      ) : ""} {/* Si le statut d'authentification est inconnu, ne rien afficher */}
    </nav>
  );
}

export default Nav;