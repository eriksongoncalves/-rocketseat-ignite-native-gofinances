import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { categories } from './mock.json';
import { Button } from '../../components';

type Category = {
  key: string;
  name: string;
};

type CategorySelectProps = {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
};

function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: CategorySelectProps) {
  const handleCategorySelect = useCallback(
    (category: Category) => {
      setCategory(category);
    },
    [setCategory]
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  );
}

export default CategorySelect;
