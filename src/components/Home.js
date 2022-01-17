import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import TokenContext from '../contexts/TokenContext';
import UserContext from '../contexts/UserContext';
import SubscriptionContext from '../contexts/SubscriptionContext';

import styled from 'styled-components';
import axios from 'axios';

import userIcon from '../assets/user.png';


export default function Home() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const { subscription, setSubscription } = useContext(SubscriptionContext)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    console.log(subscription)
    if (token === null) return;

    const pSubscription = axios.get(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/' +
        user.membership.id,
      config
    );
    pSubscription.then(res => console.log(res.data));
    pSubscription.catch();
  }, [token]);

  function handleCancel() {
    const pCancel = axios.delete(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
      config
    );
    pCancel.then(res => {
      console.log(res.data);
      navigate('/subscriptions')
    });
  }
  if (!user) return '';
  return (
    <Container>
      <Logo src={subscription.image
      } />
      <User onClick={() => navigate(`/users/${user.id}`)} src={userIcon} />

      <Buttons>
        <div className='perks'>
          <div>
            <p>Olá, {user.name}</p>
          </div>
          {subscription.perks.map((perk) => (
            <a href={perk.link}>{perk.title}</a>
          ))}
        </div>

        <div className='manage'>
          <button onClick={handleCancel}> Mudar Plano</button>
          <button className='cancel' onClick={handleCancel}>
            Cancelar Plano
          </button>
        </div>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  color: #fff;

  p {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 53px;
  }
`;
const Logo = styled.img`
  position: fixed;
  top: 32px;
  left: 38px;
  height: 50.8px;
`;
const User = styled.img`
  position: fixed;
  top: 22px;
  right: 22px;
`;
const Buttons = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding-top: 95px;

  button,
  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 299px;
    height: 52px;
    text-decoration: none;
    background: #ff4791;
    color: #fff;

    border: 0;
    border-radius: 8px;

    margin-bottom: 8px;
  }
  a:visited {
    color: #fff;
  }

  .perks {
    display: flex;
    flex-direction: column;
  }
  .manage {
    display: flex;
    flex-direction: column;

    width: 100%;
  }
  .cancel {
    background: #ff4747;
  }
`;
