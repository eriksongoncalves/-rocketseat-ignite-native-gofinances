import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '..';

import * as S from './styles';

type InputFormProps = {
  control: Control;
  name: string;
  error?: string;
} & TextInputProps;

function InputForm({ control, name, error, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
      />
      {!!error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}

export default InputForm;
