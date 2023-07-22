import styled from 'styled-components';

const Progress = styled.div`
  position:  fixed;
  background:  linear-gradient(
    to right,
    rgba(54, 64, 202, .8) ${props => props.scroll},
    transparent  0);
  width:  100%;
  height:  4px;
  z-index:  3;
`;

export default Progress;