import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || !role) {
        navigate('/signin');
        return;
      }

      // Проверяем роль пользователя
      if (!allowedRoles.includes(role)) {
        navigate('/signin'); // или другая страница, куда перенаправить пользователя
      }
    }, [allowedRoles, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
