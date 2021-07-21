import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Content = styled.ScrollView`
  background-color: white;
  margin-top: 120px;
  padding: 0 0 0 28px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  padding-right: 28px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #16243D;
  font-weight: bold;
`;

export const ColorBox = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${({color}) => color};
  border-radius: 4px;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  height: 88px;
  border-color: rgba(22, 36, 61, 0.1);
`;

export const TimeActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TimeInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TimeContainer = styled.View`
  margin-left: 16px;
`;

export const Date = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;

export const Time = styled.Text`
  font-size: 16px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  height: 52px;
  align-items: center;
`;

export const BorderedRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  margin-left: 15px;
`;

export const ContactContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #16243D;
`;

export const TouchableIcon = styled.TouchableOpacity`
  margin-right: 24px;
`;
