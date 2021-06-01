import React, { useState, useCallback } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { schema } from './schema';
import CategorySelect from '../CategorySelect';
import {
  Button,
  InputForm,
  TransactionTypeButton,
  CategorySelectButton
} from '../../components';
import { useAuth } from '../../contexts/Auth';

type Types = 'positive' | 'negative';

type FormData = {
  name: string;
  amount: string;
};

function Register() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
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
    async (transactionData: FormData) => {
      if (!transactionType) {
        Alert.alert('Selecione o tipo de transação');
        return;
      }

      if (category.key === 'category') {
        Alert.alert('Selecione a categoria');
        return;
      }

      try {
        const newData = {
          id: String(uuid.v4()),
          title: transactionData.name,
          amount: transactionData.amount,
          type: transactionType,
          category: category.key,
          date: new Date()
        };

        const oldData = await AsyncStorage.getItem(
          `@gofinances:transactions_user:${user.id}`
        );
        const currentData = oldData ? JSON.parse(oldData) : [];

        await AsyncStorage.setItem(
          `@gofinances:transactions_user:${user.id}`,
          JSON.stringify([newData, ...currentData])
        );

        reset();
        setTransactionType(undefined);
        setCategory({
          key: 'category',
          name: 'Categoria'
        });
        navigation.navigate('Listagem');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        Alert.alert('Não foi possível salvar os dados');
      }
    },
    [category.key, navigation, reset, transactionType, user.id]
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
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
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
