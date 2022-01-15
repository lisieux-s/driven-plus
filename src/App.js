import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Subscriptions from './components/Subscriptions';
import Subscription from './components/Subscription';
import Home from './components/Home';

import TokenContext from './contexts/TokenContext';
import SubscriptionsContext from './contexts/SubscriptionsContext';

export default function App() {
  const [token, setToken] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <SubscriptionsContext.Provider value={{ subscriptions, setSubscriptions }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/subscription/:ID' element={<Subscription />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SubscriptionsContext.Provider>
    </TokenContext.Provider>
  );
}
