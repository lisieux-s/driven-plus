import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Subscriptions from './components/Subscriptions';
import Subscription from './components/SubscriptionOption';
import Home from './components/Home';

import IDContext from './contexts/IDContext';
import TokenContext from './contexts/TokenContext';

export default function App() {
  const [ID, setID] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
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
    </TokenContext.Provider>
  );
}
