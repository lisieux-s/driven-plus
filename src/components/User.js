import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import TokenContext from '../contexts/TokenContext';

import axios from 'axios';
import styled from 'styled-components';

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [disabled, setDisabled] = useState(true);
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(currentPassword);

  function handleUpdate(e) {
    e.preventDefault();

    setUpdate(true);
    setDisabled(false);
  }
  function handleSubmit(e) {
    e.preventDefault();

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
    pSubmit.then((res) => console.log(res));
    pSubmit.catch();
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder={user.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
        />
        <input
          type='text'
          placeholder={user.cpf}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          disabled={true}
        />
        <input
          type='text'
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
        />
        {!update ? (
          <button onClick={handleUpdate}>ATUALIZAR</button>
        ) : (
          <>
            <input
              type='text'
              placeholder='Senha atual'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={disabled}
            />
            <input
              type='text'
              placeholder='Nova senha'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={disabled}
            />
            <button onClick={handleSubmit}>SALVAR</button>
          </>
        )}
      </form>
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
`;
