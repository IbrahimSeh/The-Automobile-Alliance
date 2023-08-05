import styled from 'styled-components';

const Progress = styled.div`
  position:  fixed;
  background:  linear-gradient(
    to right,
    rgba(54, 64, 202, 0.8) ${props => props.scroll},
    #00000000 0);
  width:  100%;
  height:  4px;
  z-index:  10;
`;

export default Progress;