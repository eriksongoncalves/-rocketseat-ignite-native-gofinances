import React, { useState, useCallback } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as S from './styles';
import { schema } from './schema';
import CategorySelect from '../CategorySelect';
import {
  Button,
  InputForm,
  TransactionTypeButton,
  CategorySelectButton
} from '../../components';

type Types = 'up' | 'down';

type FormData = {
  name: string;
  amount: string;
};

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const [transactionType, setTransactionType] = useState<Types>();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleTransactionTypeSelect = useCallback((type: Types) => {
    setTransactionType(type);
  }, []);

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleRegister = useCallback(
    (data: FormData) => {
      if (!transactionType) {
        Alert.alert('Selecione o tipo de transação');
        return;
      }

      if (category.key === 'category') {
        Alert.alert('Selecione a categoria');
        return;
      }

      // eslint-disable-next-line no-console
      console.log({
        ...data,
        transactionType,
        category: category.key
      });
    },
    [category.key, transactionType]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="words"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={category => setCategory(category)}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;
