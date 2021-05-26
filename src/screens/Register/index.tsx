import React, { useState, useCallback } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import * as S from './styles';
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
  const { control, handleSubmit } = useForm();

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
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm placeholder="Nome" name="name" control={control} />

          <InputForm placeholder="Preço" name="amount" control={control} />

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
  );
}

export default Register;
