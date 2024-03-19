import axios from "axios";
import { loginFail, loginSuccess, logoutSuccess, isToken } from "../slices/loginSlice";
import { userFail, userLogout, userSuccess, userUpdateFail, userUpdateSuccess } from "../slices/userSlice";
import { useNavigate } from 'react-router-dom';

export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username
});

export const setPassword = (password) => ({
  type: 'SET_PASSWORD',
  payload: password
});

export const setRememberMe = (rememberMe) => ({
  type: 'SET_REMEMBER_ME',
  payload: rememberMe
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});


const BASE_URL = "http://localhost:3001/api/v1";

const getToken = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? token.slice(1, -1) : null;
};

export const login = (email, password, rememberMe, redirectCallback) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
    
    if (response && response.data && response.data.body && response.data.body.token) {
      const token = JSON.stringify(response.data.body.token);
      
      // Stockez les informations d'identification si "Se souvenir de moi" est activé
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password); // Stockez le mot de passe seulement si nécessaire
      } else {
        // Supprimez les informations d'identification précédemment stockées
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      rememberMe ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
      dispatch(loginSuccess(response.data));
      
      // Appelez la fonction de redirection passée en paramètre
      if (typeof redirectCallback === 'function') {
        redirectCallback('/User');
      }
    } else {
      dispatch(loginFail("Invalid response from server"));
    }
  } catch (error) {
    // Handle errors appropriately here
    dispatch(loginFail(error.response?.data?.message || "An error occurred during login"));
  }
};

export const loadRememberedUser = () => async (dispatch) => {
  const rememberedUsername = localStorage.getItem("username");
  const rememberedPassword = localStorage.getItem("password");
  if (rememberedUsername) {
    // Remplissez automatiquement les champs de connexion avec les informations d'identification mémorisées
    dispatch(setUsername(rememberedUsername));
    dispatch(setPassword(rememberedPassword)); // Assurez-vous que votre action setPassword est définie
  }
};


export const userProfile = () => dispatch => {
  const token = getToken();
  axios.post(`${BASE_URL}/user/profile`, { token }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
          dispatch(userSuccess(response.data));
          dispatch(isToken());
      })
      .catch(error => {
          dispatch(userFail(error.response));
      });
};

export const updateProfile = (userName) => async (dispatch) => {
  const token = getToken();
  console.log("Token:", token);
  console.log("userName:", userName);

  try {
    const response = await axios.put(
      `${BASE_URL}/user/profile`,
      { userName },
      { headers: { "Authorization": `Bearer ${token}` } }
    );

    console.log("Update success:", response.data);
    dispatch(userUpdateSuccess(response.data)); // Dispatch des données mises à jour
  } catch (error) {
    console.error("Update failed:", error);
    dispatch(userUpdateFail(error.response));
  }
};

export const logout = () => dispatch => {
    sessionStorage.clear();
    localStorage.removeItem('token');
    dispatch(userLogout());
    dispatch(logoutSuccess());
};

const auth_service = { login, logout, userProfile, updateProfile }

export default auth_service