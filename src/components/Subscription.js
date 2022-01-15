import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import perks from '../assets/perks.png';
import price from '../assets/price.png';

import TokenContext from '../contexts/TokenContext';
import SubscriptionsContext from '../contexts/SubscriptionsContext';

export default function Subscription() {
  const { ID } = useParams();
  const { token, setToken } = useContext(TokenContext);

  const [subscription, setSubscription] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (token === null) return;

    const pSubscription = axios.get(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/' +
        ID,
      config
    );
    pSubscription.then((res) => {
      setSubscription(res.data);
    });
    pSubscription.catch((res) => console.log(res));
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return !subscription ? (
    ''
  ) : (
    <Container>
      <img src={subscription.image} />
      <h1>{subscription.name}</h1>
      <span>
        <img className='perks' src={perks} /> Benefícios:
      </span>
      {subscription.perks.map((perk, index) => (
        <p>
          {index + 1}. {perk.title}
        </p>
      ))}

      <span>
        <img className='price' src={price} />
        Preço:
      </span>
      <p>R$ {subscription.price} cobrados mensalmente</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Nome impresso no cartão' />
        <input type='text' placeholder='Digitos do cartão' />
        <span>
          <input type='password' placeholder='Código de segurança'/>
          <input type='text' placeholder='Validade'/>
        </span>
        <button>ASSINAR</button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #fff;
  width: 299px;
  img {
    height: 95px;
    align-self: center;
  }
  h1 {
    font-size: 32px;
    font-weight: 700;
    align-self: center;
  }
  span {
    display: flex;
    font-size: 16px;
    margin: 5px 0;
    gap: 8px;
    input {
      width: 145px;
      font-size: 14px;
    }
  }
  .perks {
    height: 16px;
  }
  .price {
    height: 10.5px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 34px;
    span {
      margin: 0;
      gap: 9px;
    }
    button {
      background: #FF4791;
      border: 0;
      border-radius: 8px;
      width: 100%;
      height: 52px;
      
      color: #fff;
      font-weight: 700;
    }
  }
  input {
    width: 299px;
    height: 52px;
    border: 0;
    border-radius: 8px;
    padding: 14px;
  }
  
`;
