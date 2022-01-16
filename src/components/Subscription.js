import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

import perks from '../assets/perks.png';
import price from '../assets/price.png';

import TokenContext from '../contexts/TokenContext';

Modal.setAppElement('.root');

export default function Subscription() {
  const [modalOpen, setModalOpen] = useState(false);

  const { ID } = useParams();
  const { token, setToken } = useContext(TokenContext);

  const [subscription, setSubscription] = useState(null);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [securityNumber, setSecurityNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const customStyles = {
    overlay: {
      backgroundColor: '#000000b2',
    },
    content: {
      borderRadius: '12px',
      width: '248px',
      height: '210px',
      margin: '0 auto',
      top: '229px',
    },
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

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleConfirm() {
    const pSubscribe = axios.post(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
      {
        membershipId: ID,
        cardName: cardName,
        cardNumber: cardNumber,
        securityNumber: securityNumber,
        expirationDate: expirationDate
      },
      config
    );
    pSubscribe.then((res) => console.log(res));
    pSubscribe.catch((res) => console.log(res));
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
        <input
          type='text'
          placeholder='Nome impresso no cartão'
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Digitos do cartão'
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <span>
          <input
            type='password'
            placeholder='Código de segurança'
            value={securityNumber}
            onChange={(e) => setSecurityNumber(e.target.value)}
          />
          <input
            type='text'
            placeholder='Validade'
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </span>
        <button onClick={handleOpenModal}>ASSINAR</button>
      </form>

      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        centered
      >
        <ModalContainer>
          <p>
            Tem certeza que deseja assinar o plano {subscription.name} (R${' '}
            {subscription.price})?
          </p>
          <span>
            <No onClick={handleCloseModal}>Não</No>
            <Yes onClick={handleConfirm}>SIM</Yes>
          </span>
        </ModalContainer>
      </Modal>
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
      background: #ff4791;
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

const No = styled.button`
  background: #cecece;
`;
const Yes = styled.button`
  background: #ff4791;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  p {
    margin-top: 22px;
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  button {
    width: 95px;
    height: 52px;
    border: 0;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
  }
  span {
    display: flex;
    justify-content: center;
    gap: 14px;
    padding: 0;
    margin: 0;
  }
`;
