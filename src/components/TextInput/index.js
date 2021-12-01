import React from 'react';
import {Input} from './styled';

const TextInput = ({
  placeholder = '',
  value = '',
  onInputChange = () => {},
}) => {
  return (
    <Input
      value={value}
      onChangeText={onInputChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
