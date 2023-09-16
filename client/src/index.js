import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chat from './components/chat.js';
import UserProfilePage from './Pages/UserProfilePage'; 
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/userprofile" element={<UserProfilePage />} /> {}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
