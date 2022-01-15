import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import DRIVENPLUS from '../assets/DRIVENPLUS.png';
import TokenContext from '../contexts/TokenContext';

export default function Login() {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {token, setToken} = useContext(TokenContext);

  function handleSubmit(e) {
    e.preventDefault();
    let pLogin = axios.post(
      'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login',
      {
        email,
        password,
      }
    );
    pLogin.then(res => {
      setToken(res.data.token)
        if(res.data.membership === null) {
            navigate('/subscriptions')
        } else {
            navigate('/home')
        }
    })
    pLogin.catch(res => alert('Ocorreu um erro: ' + res))
  }
    
  return (
    <>
      <StyledImg src={DRIVENPLUS} alt='Driven+' />
      <StyledForm onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>ENTRAR</button>
      </StyledForm>
      <StyledLink to='/sign-up'>Não possui uma conta? Cadastre-se</StyledLink>
    </>
  );
}

const StyledImg = styled.img`
  margin-bottom: 100px;
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  color: #ffffff;
  :visited {
    color: #ffffff;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input,
  button {
    width: 299px;
    height: 52px;
    border: 0;
    border-radius: 8px;
  }
  input {
    padding: 18px;
  }
  button {
    background: #ff4791;
    color: #fff;
    font-weight: 700;
  }
`;
