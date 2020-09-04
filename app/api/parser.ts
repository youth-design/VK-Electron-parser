import {
  LikesGetListParams,
  LikesGetListResponse,
  UsersGetParams,
  UsersGetResponse,
  UsersUserFull,
  VK,
  WallSearchParams,
  WallSearchResponse,
  WallWallpostFull,
} from 'vk-io';
import { ParserForm } from '../components/parser/constants';

const getLastPost = async (
  parserForm: ParserForm,
  vk: VK
): Promise<WallWallpostFull> => {
  const opts: WallSearchParams = {
    owner_id: parseInt(parserForm.PUB_ID, 10),
    query: parserForm.SEARCH_REQUEST,
    count: 1,
  };
  const wallPosts: WallSearchResponse = await vk.api.wall.search(opts);
  if (wallPosts.items.length) {
    return wallPosts.items[0];
  }
  throw new Error('Не удалось найти посты.');
};

const getUsersList = async (
  parserForm: ParserForm,
  vk: VK,
  wallPost: WallWallpostFull
) => {
  let users: Set<number> = new Set();
  while (users.size < wallPost.likes.count) {
    const opts: LikesGetListParams = {
      owner_id: parseInt(parserForm.PUB_ID, 10),
      count: 1000,
      type: 'post',
      offset: users.size,
      item_id: wallPost.id,
    };
    // eslint-disable-next-line no-await-in-loop
    const tempUsers: LikesGetListResponse = await vk.api.likes.getList(opts);
    users = new Set([...users, ...tempUsers.items]);
  }
  if (users.size) {
    return Array.from(users);
  }
  throw new Error('Нет лайков у поста');
};

const getUsersInfo = async (
  vk: VK,
  users: number[]
): Promise<UsersUserFull[]> => {
  let usersInfo: UsersUserFull[] = [];

  while (users.length - usersInfo.length > 0) {
    let usersCountForIteration = 0;
    if (users.length - usersInfo.length >= 1000) {
      usersCountForIteration = 1000;
    } else if (
      users.length - usersInfo.length > 0 &&
      users.length - usersInfo.length < 1000
    ) {
      usersCountForIteration = users.length;
    }

    const opts: UsersGetParams = {
      user_ids: users
        .slice(usersInfo.length, usersInfo.length + usersCountForIteration)
        .map((user) => user.toString())
        .join(','),
      fields: [
        'city',
        'home_town',
        'sex',
        'bdate',
        'domain',
        'last_seen',
        'online',
        'photo_50',
      ],
    };

    // eslint-disable-next-line no-await-in-loop
    const tempUsersInfo: UsersGetResponse = await vk.api.users.get(opts);
    usersInfo = [...usersInfo, ...tempUsersInfo];
  }
  return usersInfo;
};

exports.parseUsers = async (
  parserForm: ParserForm,
  token: string
): Promise<UsersUserFull[]> => {
  const vk = new VK({
    token,
  });

  const wallPost: WallWallpostFull = await getLastPost(parserForm, vk);
  const users = await getUsersList(parserForm, vk, wallPost);
  const usersInfo = await getUsersInfo(vk, users);
  return usersInfo;
};
