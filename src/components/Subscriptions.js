import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SubscriptionOption from './SubscriptionOption';

import TokenContext from '../contexts/TokenContext';

export default function Subscriptions() {
  const [subscriptionOptions, setSubscriptionOptions] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    if (token === null) return;

    const pSubscriptionOptions = axios.get(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships',
      config
    );
    pSubscriptionOptions.then((res) => {
      setSubscriptionOptions(res.data);
      console.log(res.data);
    });
    pSubscriptionOptions.catch((res) => console.log(res));
  }, [token]);

  return (
    <>
      <Title>Escolha seu plano</Title>
      {!subscriptionOptions
        ? 'perae'
        : subscriptionOptions.map((subscriptionOption) => (
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
