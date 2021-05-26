import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  price: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O preço é obrigatório')
});
