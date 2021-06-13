import styled from 'styled-components';

export const Wrapper = styled.View`
  width: 100%;
  height: ${({height}) => height}px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: white;
  align-items: center;
  padding: 15px 0;
`;

export const Title = styled.Text`
  color: #1b041e;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;