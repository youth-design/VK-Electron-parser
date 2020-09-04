import { ValidationRules } from 'react-hook-form';

export type FormField = {
  name: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  validationRules?: ValidationRules;
};
