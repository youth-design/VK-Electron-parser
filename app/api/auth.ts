// TODO Refactor this code
import { AuthForm } from '../components/auth/constants';

const fs = require('fs');
const { VK } = require('vk-io');
const { Authorization } = require('@vk-io/authorization');

const loginWithToken = async (token: string) => {
  const Vk = new VK({
    token,
  });

  await Vk.api.wall.get({
    owner_id: 1,
  });

  return { token };
};

const saveToken = (token = '') => {
  try {
    fs.writeFileSync(`${__dirname}/token`, token);
  } catch (e) {
    throw new Error(e);
  }
};

const readTokenFromFile = () => {
  try {
    const token = fs.readFileSync(`${__dirname}/token`);
    return token;
  } catch (e) {
    throw new Error(e);
  }
};

exports.loginWithCredentials = async (
  credentials: AuthForm | undefined
): Promise<any> => {
  const Vk = new VK({
    appId: process.env.APP_ID || '6606689',
    appSecret: process.env.APP_SECRET || 'rld90cqCX4znzS6HPN5J',

    login: credentials?.LOGIN,
    password: credentials?.PASSWORD,

    authScope: ['wall'],
  });
  const authorization = new Authorization(Vk);

  const direct = authorization.implicitFlowUser();

  const response = await direct.run();
  if (response.token) {
    saveToken(response.token || '');
  }
  return response;
};

exports.loginWithToken = async () => {
  const token = readTokenFromFile();
  const authData = await loginWithToken(token);
  return authData;
};
