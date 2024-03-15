import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, updateProfile } from '../../Components/actions/authActions';
import auth_service from '../../Components/actions/authActions';

function Header() {
  const user = useSelector((state) => state.user);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const [edit, showEdit] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [newUserName, setNewUserName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    dispatch(auth_service.updateProfile(newUserName));
    showEdit(false);
  }

  useEffect(() => {
    if (token !== null) {
      dispatch(auth_service.userProfile(token));
    }
  }, [token, dispatch]);

  // Mettre à jour le nom d'utilisateur local lorsque les données de l'utilisateur changent
  useEffect(() => {
    setNewUserName(user.userName);
  }, [user.userName]);

  return (
    <div className="header">
      <h1>Welcome back<br />{edit === false ? firstName + ' ' + lastName : ""}</h1>
      {edit === false ?
        <button className="edit-button" onClick={() => { showEdit(true) }}>Edit Name</button>
        :
        <form className='edit-inputs-buttons' onSubmit={submit}>
          <div className='edit-inputs'>
            <p>User Name :
              <input type="text" className='edit-input' value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
            </p>
            <p>First name :
              <input type="text" className='edit-input' value={firstName} disabled />
            </p>
            <p>Last name :
              <input type="text" className='edit-input' value={lastName} disabled />
            </p>
          </div>
          <div className='edit-buttons'>
            <button className='edit-button-option' type='submit'>Save</button>
            <button className='edit-button-option' onClick={() => { showEdit(false) }}>Cancel</button>
          </div>
        </form>
      }
    </div>
  );
}

export default Header;
