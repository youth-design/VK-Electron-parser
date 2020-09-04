import React, { useEffect, useState } from 'react';
import { UsersUserFull } from 'vk-io';
import UserListItem from '../../userListItem/UserListItem';

import styles from './Pagination.css';

type PaginationProps = {
  users: UsersUserFull[];
};

const Pagination = (props: PaginationProps) => {
  const [page, setPage] = useState(0);
  const { users } = props;

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    if (page >= 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [users.length]);

  return (
    <div>
      <div className={styles.itemsContainer}>
        {users.slice(page * 20, page * 20 + 20).map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
      <div hidden={users.length <= 20}>
        <button type="button" onClick={decrementPage}>
          -
        </button>
        <button type="button" onClick={incrementPage}>
          +
        </button>
      </div>
    </div>
  );
};

export default Pagination;
