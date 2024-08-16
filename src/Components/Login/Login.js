import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false); // Nouvel état pour le succès de l'authentification
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogin = (event) => {
    event.preventDefault();
    const validationErrors = {};

    // Validation de l'email
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }

    // Validation du mot de passe
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    // Mise à jour des erreurs
    setErrors(validationErrors);

    // Si aucune erreur de validation, procéder à la connexion
    if (Object.keys(validationErrors).length === 0) {
      // Vérification des informations d'authentification (compte statique)
      if (email === 'mouadh@gmail.com' && password === '123') {
        setLoginSuccess(true); // Authentification réussie
        navigate('/home'); // Navigation vers la page Home après authentification réussie
      } else {
        setLoginSuccess(false); // Authentification échouée
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Effacer le message d'erreur lorsqu'un champ est modifié
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    // Mettre à jour les valeurs des champs
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} noValidate>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      {loginSuccess && <p className="success-message">Authentication successful!</p>}
      {loginSuccess === false && <p className="error-message">Authentication failed. Please check your credentials.</p>}
    </div>
  );
};

export default Login;
