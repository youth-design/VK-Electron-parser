import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { UsersUserFull } from 'vk-io';
import styles from './Parser.css';
import authStyles from '../auth/Auth.css';
import {
  filterFields,
  FilterForm,
  parserFields,
  ParserForm,
} from './constants';
import { RootState } from '../../store';
import { fetchUsers } from './redux/actions';
import Pagination from './components/Pagination';
import Input from '../shared/input/Input';

const mapStateToProps = (state: RootState) => ({
  parserState: state.parser,
});

const mapDispatchToProps = {
  fetchUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ParserProps = PropsFromRedux;

function Parser(props: ParserProps): JSX.Element {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<UsersUserFull[]>([]);
  const parserForm = useForm<ParserForm>({
    defaultValues: {
      [parserFields.PUB_ID.name]: '-25240087',
      [parserFields.SEARCH_REQUEST.name]: '#ивент',
    },
  });
  const filterForm = useForm<FilterForm>();

  const { parserState } = props;

  const onSubmitForm = (data: ParserForm) => {
    props.fetchUsers(data);
  };

  const resetFilter = () => {
    setIsFiltered(false);
    filterForm.setValue(filterFields.SEARCH_QUERY.name, '');
  };

  const onFilter = (request: string) => {
    setFilterDisabled(true);
    let tempUsers = [...parserState.users];
    tempUsers = tempUsers.filter((user) => {
      return (
        `${user.id} ${user.city?.title} ${user.home_town} ${user.first_name} ${user.last_name}`.indexOf(
          request
        ) !== -1
      );
    });
    setIsFiltered(true);
    setFilteredUsers(tempUsers);
  };

  // TODO переделать фильтрацию
  const onFilterFormSubmit = (data: FilterForm) => {
    if (filterDisabled) return;
    if (data.SEARCH_QUERY.trim().length) {
      onFilter(data.SEARCH_QUERY);
    } else if (!data.SEARCH_QUERY.trim().length && isFiltered) {
      setIsFiltered(false);
    }
    setFilterDisabled(false);
  };

  return (
    <div className={`${authStyles.containerColor} ${styles.container}`}>
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...parserForm}>
          <form onSubmit={parserForm.handleSubmit(onSubmitForm)}>
            <div>
              <Input
                inputRef={parserForm.register}
                name={parserFields.PUB_ID.name}
                placeholder={parserFields.PUB_ID.placeholder}
              />
            </div>
            <div>
              <Input
                inputRef={parserForm.register}
                name={parserFields.SEARCH_REQUEST.name}
                placeholder={parserFields.SEARCH_REQUEST.placeholder}
              />
            </div>
            <button type="submit">Поиск</button>
          </form>
        </FormProvider>
      </div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...filterForm}>
        <form
          onSubmit={filterForm.handleSubmit(onFilterFormSubmit)}
          hidden={!parserState.users.length}
        >
          <Input
            inputRef={filterForm.register}
            name={filterFields.SEARCH_QUERY.name}
            placeholder={filterFields.SEARCH_QUERY.placeholder}
            rightIcon={isFiltered ? <i className="fas fa-times" /> : undefined}
            onRightIconClick={resetFilter}
          />
          <button type="submit" disabled={filterDisabled}>
            Фильтровать
          </button>
        </form>
      </FormProvider>
      <div>
        <Pagination users={isFiltered ? filteredUsers : parserState.users} />
      </div>
    </div>
  );
}

export default connector(Parser);
