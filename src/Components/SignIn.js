import React, { useState } from 'react';
import { $host } from '../http/axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();  // Предотвращаем отправку формы

    try {
      const response = await $host.post('/users/login', { username, password });
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);  // Сохраняем роль пользователя

      // Проверяем роль пользователя и перенаправляем на соответствующую страницу
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      // Перезагрузка страницы
      window.location.reload();
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Incorrect username or password');
    }
  };
  
  
  

  return (


    <div className='form-container'>
      <form action="" method="post" enctype="multipart/form-data">
      <h3>Вход в аккаунт</h3>
      <p>Ваш email: </p>
        <input type="email" name="email" placeholder="Введите email" required maxlength="50" className='box' value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Ваш пароль: </p>
        <input type="password" name="pass" placeholder="Введите пароль" required maxlength="20" className='box' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className='btn' onClick={handleSignIn}>Вход</button>
        {error && <p className="error">{error}</p>}
        </form>
    </div>


  );
};

export default SignIn;
