import React from 'react';

import * as S from './styles';
import { categories } from '../../utils/categories.json';

export type TransactionCardProps = {
  amount: string;
  category: string;
  date: string;
  title: string;
  type: 'positive' | 'negative';
};

function TransactionCard({
  amount,
  category,
  date,
  title,
  type
}: TransactionCardProps) {
  const [transactionCategory] = categories.filter(
    item => item.key === category
  );

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={transactionCategory.icon} />
          <S.CategoryName>{transactionCategory.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}

export default TransactionCard;
