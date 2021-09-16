import styled from 'styled-components';

export const Container = styled.View`
  height: 120px;
  width: 100%;
  margin-top: 16px;
  border: 1px solid rgba(22, 36, 61, 0.1);
  border-radius: 8px;
  /* align-items: center; */
  flex-direction: row;
  padding: 16px 24px 16px 0;
`;

export const Tint = styled.View`
  background: #4A70BF;
  border-radius: 8;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 8px;
  height: 80px;
  align-self: center;
  margin-right: 16px;
`;

export const Title = styled.Text`
  color: #16243D;
  font-weight: 600;
  font-size: 16px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const DescriptionText = styled.Text`
  font-size: 14px;
  color: #16243D;
  margin-top: 4px;
`;

export const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TimeContainer = styled.View`
  margin-left: 12px;
`;

export const Date = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #16243D;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #16243D;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AcceptButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #3DAD7A;
  margin-right: 20px;
`;

export const DeclineButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #F25449;
`;
