import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Subscriptions from './components/Subscriptions';
import Subscription from './components/Subscription';
import Home from './components/Home';
import User from './components/User';

import UserContext from './contexts/UserContext'
import TokenContext from './contexts/TokenContext';
import SubscriptionsContext from './contexts/SubscriptionsContext';

export default function App() {
  const [token, setToken] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <TokenContext.Provider value={{ token, setToken }}>
      <SubscriptionsContext.Provider value={{ subscriptions, setSubscriptions }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/subscription/:ID' element={<Subscription />} />
            <Route path='/home' element={<Home />} />
            <Route path='/users/:userID' element={<User />} />
          </Routes>
        </BrowserRouter>
      </SubscriptionsContext.Provider>
    </TokenContext.Provider>
    </UserContext.Provider>
  );
}
