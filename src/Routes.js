import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.js';
import SignIn from './Pages/SignIn/SignIn.js';
import User from './Pages/User/User.js';
import Error from './Pages/404/404.js';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/User" element={<User />} />
        <Route path='/Error' element={<Error />} />
      </Routes>
    </Router>
  );
};
  
  export default AppRoutes;