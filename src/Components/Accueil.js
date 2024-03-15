import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import the useSelector hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from "../Ressources/Nav/Nav";
import Hero from "../Ressources/hero/Hero";
import Features from "../Ressources/features/features";
import logo from '../assets/argentBankLogo.png';
import Footer from "../Ressources/Footer/Footer";
import '../Styles/Styles.css';

function Accueil() {
  const user = useSelector(state => state.user);

  return (
    <div>
      <div className="banner">
        <Nav />
        <main>
          <Hero /> 
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Accueil;
