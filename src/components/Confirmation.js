import styled from 'styled-components';

export default function Confirmation(props) {
  return (
    <ConfirmationContainer clicked={props.clicked}>
      <div>
        <p>Tem certeza que deseja assinar o plano Driven Plus (R$ 39,99)?</p>
        <span>
          <No>Não</No>
          <Yes>SIM</Yes>
        </span>
      </div>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  display: ${(props) => (props.clicked ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000000b2;

  position: fixed;
  left: 0;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 248px;
    height: 210px;
    background: #fff;
    border-radius: 12px;

    padding: 11px 22px;
    gap: 20px;
    p {
      margin-top: 22px;
      color: #000000;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
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
      padding: 0;
      margin: 0;
    }
  }
`;
const No = styled.button`
  background: #cecece;
`;
const Yes = styled.button`
  background: #ff4791;
`;
