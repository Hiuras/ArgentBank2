import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import the useSelector hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from "../../Components/Nav/Nav";
import Hero from "../../Components/hero/Hero";
import Features from "../../Components/features/features";
import logo from '../../assets/argentBankLogo.png';
import Footer from "../../Components/Footer/Footer";
import '../../Styles/Styles.css';

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
