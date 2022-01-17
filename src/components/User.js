import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import TokenContext from '../contexts/TokenContext';

import styled from 'styled-components';

import arrow from '../assets/arrow-back.png'

export default function User() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleUpdate(e) {
    e.preventDefault();

    navigate(`/users/${user.id}/update`)
  }

  return (
    
    <Container>
      <form onSubmit={handleUpdate}>
        <input
          type='text'
          placeholder={user.name}
          disabled
        />
        <input
          type='text'
          placeholder={user.cpf}
          disabled
        />
        <input
          type='text'
          placeholder={user.email}
          disabled
        />
          <button type='submit'>ATUALIZAR</button>   
      </form>
      <img className='arrow' src={arrow} alt='go back' onClick={() => navigate('/home')}/>

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
