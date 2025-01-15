import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './Components/AppRouter';
import { AdminRouter } from './admincomponents.js/AdminRouter';



const App = () => {
  return (  
    <Router>
      <div >
      {/* <Header /> */}
      <AppRouter />
      <AdminRouter />
      </div>
    </Router>
  );
};

export default App;

  