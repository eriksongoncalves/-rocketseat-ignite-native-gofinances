import React from 'react';

import * as S from './styles';

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardProps = {
  amount: string;
  category: Category;
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
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}

export default TransactionCard;
