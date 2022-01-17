import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SubscriptionOption(props) {

  return (
    <StyledLink to={'/subscription/' + props.id}>
      <img src={props.image} alt='Driven Plus' />
      <p>R$ {props.price}</p>
    </StyledLink>
  );
}
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 290px;
  height: 180px;

  border: 3px solid #7e7e7e;
  border-radius: 12px;

  gap: 20px;
  margin: 10px 0;
  text-decoration: none;

  p {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }
`;
