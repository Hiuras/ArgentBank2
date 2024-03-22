import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Components/Nav/Nav';
import Form from '../../Components/Form/Form';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/Styles.css';

function SignIn(props) {
  return (
    <div>
      <Nav />
      <main className="main bg-dark">
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;