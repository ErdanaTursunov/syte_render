import React, { useEffect, useState } from 'react';
import { $authHost } from '../http/axios';
import '../App.css';
import Header from './Header'; // Импортируем компонент Header
import withAuth from './WithAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UsersDownload = () => {
  const [users, setUsers] = useState([]); // Состояние для хранения списка пользователей
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' }); // Состояние для хранения нового пользователя
  const [error, setError] = useState(''); // Состояние для хранения сообщения об ошибке

  // Обработчик изменения значений в полях ввода формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем запрос на регистрацию нового пользователя
      const response = await $authHost.post('/register', newUser);
      // Обновляем состояние списка пользователей, добавляя нового пользователя
      setUsers([...users, response.data]);
      // Очищаем поля ввода
      setNewUser({ username: '', password: '', role: 'user' });
      // Очищаем сообщение об ошибке
      setError('');

      window.location.reload();
    } catch (error) {
      // Обрабатываем ошибку при регистрации пользователя
      setError('Ошибка при регистрации пользователя');
      console.error('Error registering user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Отправляем запрос на удаление пользователя
      await $authHost.delete(`/users/${userId}`);
      // Обновляем состояние списка пользователей, удаляя удаленного пользователя
      setUsers(users.filter(user => user.id !== userId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Запрос на сервер для получения списка пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await $authHost.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className='home'>
      <Header /> {/* Отображаем компонент Header */}
      <section className='user-profile'>
        <h1 className='heading'>Добавление или удаление пользователей</h1>
        <div className='info'>
          <div id='container'>
            <form id='uploadForm' onSubmit={handleSubmit}>
              <h1>Логин: </h1>
              <input type='text' name='username' id='login' placeholder='Введите логин' value={newUser.username} onChange={handleInputChange} required />
              <h1>Пароль: </h1>
              <input type='password' name='password' id='password' placeholder='Введите пароль' value={newUser.password} onChange={handleInputChange} required />
              <h1>Роль пользователя: </h1>
              <select id='choices' name='role' value={newUser.role} onChange={handleInputChange}>
                <option value='user'>Пользователь</option>
                <option value='admin'>Администратор</option>
              </select>
              <button type='submit'>Добавить</button>
              {error && <p className='error'>{error}</p>}
            </form>
          </div>
        </div>
      </section>
      <section className='user-profile'>
        <h1 className='heading'>Список пользователей</h1>
        <div className='infos'>
          <div >
            {users.map(user => (
              <div className='users' key={user.id} style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <p style={{ marginRight: '10px' }} className='username'>{user.username}</p>
                  <p className='username'>{user.role}</p>
                </div>
                <button onClick={() => handleDeleteUser(user.id)}>
                  <i ><FontAwesomeIcon icon={faTrash} /></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default withAuth(UsersDownload, ['admin']);
