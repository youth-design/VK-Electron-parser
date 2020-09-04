import { FormField } from '../../types/forms';

type ParserFields = {
  PUB_ID: FormField;
  SEARCH_REQUEST: FormField;
};

export const parserFields: ParserFields = {
  PUB_ID: {
    name: 'PUB_ID',
    placeholder: 'Айди',
  },
  SEARCH_REQUEST: {
    name: 'SEARCH_REQUEST',
    placeholder: 'Поисковой запрос',
  },
};

export type ParserForm = {
  PUB_ID: string;
  SEARCH_REQUEST: string;
};

type FilterFields = {
  SEARCH_QUERY: FormField;
};

export const filterFields: FilterFields = {
  SEARCH_QUERY: {
    name: 'SEARCH_QUERY',
    placeholder: 'Фильтр',
  },
};

export type FilterForm = {
  SEARCH_QUERY: string;
};
