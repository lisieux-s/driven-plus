import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SubscriptionOption from './SubscriptionOption';

import TokenContext from '../contexts/TokenContext';
import SubscriptionsContext from '../contexts/SubscriptionsContext';

export default function Subscriptions() {
  const [ subscriptions, setSubscriptions ] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    if (token === null) return;

    const pSubscriptions = axios.get(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships',
      config
    );
    pSubscriptions.then((res) => {
      setSubscriptions(res.data);
    });
    pSubscriptions.catch((res) => console.log(res));
  }, [token]);

  return (
    <>
      <Title>Escolha seu plano</Title>
      {!subscriptions
        ? ''
        : subscriptions.map((subscriptionOption) => (
            <SubscriptionOption {...subscriptionOption} />
          ))}
    </>
  );
}
const Title = styled.p`
  font-weight: 700;
  color: #fff;
  font-size: 32px;
  text-align: center;
`;
