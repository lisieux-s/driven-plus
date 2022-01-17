import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import TokenContext from '../contexts/TokenContext';

import axios from 'axios';
import styled from 'styled-components';

import arrow from '../assets/arrow-back.png';

export default function User() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(currentPassword);

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword === '') {
      const pSubmit = axios.put(
        'https://mock-api.driven.com.br/api/v4/driven-plus/users/',
        {
          name,
          cpf,
          email,
          currentPassword,
        },
        config
      );
      pSubmit.then();
      pSubmit.catch((res) => alert(res));
    } else {
      const pSubmit = axios.put(
        'https://mock-api.driven.com.br/api/v4/driven-plus/users/',
        {
          name,
          cpf,
          email,
          currentPassword,
          newPassword,
        },
        config
      );
      pSubmit.then();
      pSubmit.catch((res) => alert(res));
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder={user.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder={user.cpf}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          disabled
        />
        <input
          type='text'
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Senha atual'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Nova senha'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button>SALVAR</button>
      </form>
      <img
        className='arrow'
        src={arrow}
        alt='go back'
        onClick={() => navigate(`/users/${user.id}`)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  input,
  button {
    display: flex;

    width: 299px;
    height: 52px;
    border: 0;
    border-radius: 8px;

    margin: 8px 0;
    padding: 14px;

    color: #7e7e7e;
  }
  button {
    justify-content: center;
    align-items: center;

    background: #ff4791;
    color: #fff;
    font-weight: 700;
  }
  input[disabled] {
    background: #ebebeb;
  }
  .arrow {
    position: fixed;
    top: 24.35px;
    left: 22px;
    height: 27.29px;
  }
`;
