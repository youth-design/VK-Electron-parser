import { FormField } from '../../types/forms';

type AuthFields = {
  LOGIN: FormField;
  PASSWORD: FormField;
};

export const authFields: AuthFields = {
  LOGIN: {
    name: 'LOGIN',
    placeholder: 'Логин',
    validationRules: {
      required: 'Поле обязательно для заполнения',
    },
  },
  PASSWORD: {
    name: 'PASSWORD',
    placeholder: 'Пароль',
    validationRules: {
      required: 'Поле обязательно для заполнения',
      minLength: {
        value: 4,
        message: 'Пароль должен быть длиннее 4-х символов',
      },
    },
  },
};

export type AuthForm = {
  LOGIN: string;
  PASSWORD: string;
};
