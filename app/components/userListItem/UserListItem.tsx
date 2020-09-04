import React, { useEffect, useMemo, useState } from 'react';
import { UsersUserFull } from 'vk-io';
import { CSSTransition } from 'react-transition-group';
import styles from './UserListItem.css';

const { clipboard } = require('electron');

type UserListItemProps = {
  user: UsersUserFull;
};

const UserListItem = (props: UserListItemProps) => {
  const [notificationIsShow, setNotificationIsShow] = useState(false);
  const { user } = props;
  const sex = useMemo(() => {
    if (user.sex === 1) {
      return 'Ж';
    }
    if (user.sex === 2) {
      return 'М';
    }
    return 'Неизвестен';
  }, [user.sex]);

  const writeToClipBoard = () => {
    clipboard.writeText(`https://vk.com/id${user.id}`);
  };

  useEffect(() => {
    if (notificationIsShow) {
      setTimeout(() => {
        setNotificationIsShow(false);
      }, 3000);
    }
  }, [notificationIsShow]);

  const onItemClick = () => {
    writeToClipBoard();
    setNotificationIsShow(true);
  };

  return (
    <div className={styles.container} onClick={onItemClick} aria-hidden>
      <div
        className={styles.small_image}
        style={{ backgroundImage: `url('${user.photo_50}')` }}
      />
      <div className={styles.info}>
        <div className={styles.name}>
          {`${user.first_name} ${user.last_name}`}
        </div>
        <div>
          <div>{`Пол: ${sex}.`}</div>
          <div hidden={!user.city?.title}>{`Город: ${user.city?.title}.`}</div>
          <div hidden={!user.home_town}>{`Р. Город: ${user.home_town}.`}</div>
        </div>
      </div>
      <CSSTransition
        in={notificationIsShow}
        unmountOnExit
        classNames="fade-in"
        timeout={200}
      >
        <div className={styles.notification}>
          Ссылка скопирована в буфер обмена
        </div>
      </CSSTransition>
    </div>
  );
};

export default UserListItem;
