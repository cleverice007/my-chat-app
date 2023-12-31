import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatPage from './Pages/ChatPage.js';
import UserProfilePage from './Pages/UserProfilePage'; 
import LoginPage from './Pages/LoginPage'; 
import RegisterPage from './Pages/RegisterPage';
import MatchingPage from './Pages/MatchingPage';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} /> {}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/match" element={<MatchingPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
