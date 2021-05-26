import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '..';

import * as S from './styles';

type InputFormProps = {
  control: Control;
  name: string;
} & TextInputProps;

function InputForm({ control, name, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
      />
    </S.Container>
  );
}

export default InputForm;
