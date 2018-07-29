require('dotenv').config();
require('jest-extended');
const uuid = require('uuid/v4');
const rp = require('request-promise');
const {
  deleteAllUsers,
  createUser,
  deleteUserByEmail,
} = require('../../server/knex/queries/users');

describe('provide integration testing of the /api/users route', () => {

  const dummyUser = {
    user_id: uuid(),
    email: 'Gassy_Tittes@gmail.com',
    password: 'ilovethemgassytittes',
  };

  beforeAll(async () => {
    await deleteAllUsers();
  });

  beforeEach(async () => {
    const { user_id, email, password } = dummyUser;
    await createUser(user_id, email, password);
  });

  afterEach(async () => {
    const { email } = dummyUser;
    await deleteUserByEmail(email);
  });

  afterAll(async () => {
    await deleteAllUsers();
  });

  describe('GET /api/users/', () => {

    test('if the response returns all of the users', async () => {
      const options = {
        method: 'GET',
        uri: `${process.env.DEV_DOMAIN}/api/users/`,
        headers: {
          contentType: 'application/json',
        },
        json: true,
      };
      const users = await rp(options);
      expect(users).toBeArray();
      expect(users).toBeArrayOfSize(1);
      expect(users[0].email).toBe(dummyUser.email);
      expect(users[0].password).toBe(dummyUser.password);
      expect(users[0].id).toBeNumber();
      expect(users[0].user_id).toBeString();
      expect(users[0].created_at).toBeString();
      expect(users[0].updated_at).toBeString();
    });

  });

  describe('GET /api/users/:user_id', async () => {

    test('if the response returns the correct user', async () => {
      const options = {
        method: 'GET',
        uri: `${process.env.DEV_DOMAIN}/api/users/${dummyUser.user_id}`,
        headers: {
          contentType: 'application/json',
        },
        json: true,
      };
      const user = await rp(options);
      expect(user).toBeArray();
      expect(user).toBeArrayOfSize(1);
      expect(user[0].email).toBe(dummyUser.email);
      expect(user[0].password).toBe(dummyUser.password);
      expect(user[0].id).toBeNumber();
      expect(user[0].user_id).toBeString();
      expect(user[0].created_at).toBeString();
      expect(user[0].updated_at).toBeString();
    });

    test('if the response returns an error if provided a user_id that is not available', async () => {
      const fakeId = 'awdadawdadawdawedaadwada';
      const options = {
        method: 'GET',
        uri: `${process.env.DEV_DOMAIN}/api/users/${fakeId}`,
        headers: {
          contentType: 'application/json',
        },
        json: true,
      };
      const user = await rp(options);
      expect(user).toBeArray();
      expect(user).toBeArrayOfSize(0);
    });
  });

  describe('POST /api/users/login', async () => {

    test('if the response returns a token', async () => {
      const options = {
        method: 'POST',
        uri: `${process.env.DEV_DOMAIN}/api/users/login`,
        headers: {
          contentType: 'application/json',
        },
        body: {
          email: dummyUser.email,
          password: dummyUser.password,
        },
        json: true,
      };
      const response = await rp(options);
      expect(response).toBeObject();
      expect(response.token).toBeString();
    });
  });

  test('if the response returns an error if the login credentials are incorrect', async () => {
    const options = {
      method: 'POST',
      uri: `${process.env.DEV_DOMAIN}/api/users/login`,
      headers: {
        contentType: 'application/json',
      },
      body: {
        email: 'mongolia4lyfe@gmail.com',
        password: 'mongoliarules',
      },
      json: true,
    };
    const response = await rp(options);
    expect(response.statusCode).toBe(404);
  });

});
