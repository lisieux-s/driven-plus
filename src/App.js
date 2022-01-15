import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Subscriptions from './components/Subscriptions';
import Subscription from './components/Subscription';
import Home from './components/Home';

import IDContext from './contexts/IDContext';

export default function App() {
  const [ID, setID] = useState(null);
  
  return (
    <IDContext.Provider value={{ ID, setID }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/subscription/ID' element={<Subscription />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </IDContext.Provider>
  );
}
