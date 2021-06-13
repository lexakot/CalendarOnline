import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Content = styled.ScrollView`
  background-color: white;
  margin-top: 120px;
`;

export const NameInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  margin-left: 20px;
`;

export const DateInfoContainer = styled.View`
  width: 100%;
  margin-left: 20px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  padding: 38px 0;
  align-items: center;
`;

export const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 28px;
  align-items: center;
`;

export const Date = styled.Text`
  font-size: 16px;
  color: #16243D;
  font-weight: ${({isSelected}) => (isSelected ? 'bold' : 'normal')};
  margin-left: 16px;
`;

export const TimeButton = styled.TouchableOpacity`
  align-items: center;
`;

export const TimeLabel = styled.Text`
  color: rgba(22, 36, 61, 0.3);
  font-size: 14px;
`;

export const Time = styled.Text`
  color: #16243D;
  font-size: 14px;
  font-weight: ${({isSelected}) => (isSelected ? 'bold' : 'normal')};
`;

export const Separator = styled.View`
  height: 40px;
  width: 1px;
  background-color: #16243D;
  opacity: 0.1;
  margin: 0 16px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  margin-left: 20px;
  align-items: center;
`;

export const DescriptionInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  margin-left: 15px;
`;

export const TouchableRow = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: rgba(22, 36, 61, 0.1);
  margin-left: 15px;
  padding-right: 50px;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 4px;
`;

export const ColorBox = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${({color}) => color};
  border-radius: 4px;
`;

export const Label = styled.Text`
  color: #16243D;
  font-size: 14px;
`;
