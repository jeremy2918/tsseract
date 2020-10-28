import http from 'http';
import request from 'supertest';
import setCookie, { Cookie } from 'set-cookie-parser';

import server from '../server';

const userProps = [
  '_id',
  'email',
  'name',
  'username',
  'following',
  'followers',
];

describe('User', () => {
  const SUT = http.createServer(server({ dev: true }));
  const userPayload = {
    name: 'Tsseract',
    username: 'admin_user_test',
    password: 'Admin.1234',
    email: 'admin_user_test@tsseract.com',
    birthDate: Date.now(),
  };
  let user: any, secUser: any, cookie: Cookie, secondCookie: any;
  let cookieSet: [string];

  beforeAll(async (done) => {
    user = await request(SUT).post('/api/users/').send(userPayload);
    cookie = setCookie.parse(user)[0];
    cookieSet = [`${cookie.name}=${cookie.value}`];

    secUser = await request(SUT).post('/api/users/').send({
      name: 'Second',
      username: 'secondUser',
      password: '12345678',
      email: 'secondUser@tsseract.com',
      birthDate: Date.now(),
    });
    secondCookie = setCookie.parse(secUser)[0];

    SUT.listen(done);
  });

  afterAll(async (done) => {
    await request(SUT).delete(`/api/users/`).set('Cookie', cookieSet);
    await request(SUT)
      .delete(`/api/users/`)
      .set('Cookie', [`${secondCookie.name}=${secondCookie.value}`]);

    SUT.close(done);
  });

  describe('POST:/api/users', () => {
    it('should create a new authenticated user', () => {
      userProps.forEach((p) => expect(user.body).toHaveProperty(p));
      expect(user.header).toHaveProperty('set-cookie');
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie.name).toEqual('tsseract-auth-token');
    });

    it('should not created a new user if any param is invalid', async () => {
      const user = await request(SUT)
        .post('/api/users/')
        .send({ ...userPayload, username: 'invalid username' });

      expect(user.status).toBe(400);
      expect(user.body).toHaveProperty('error');
    });

    it('should not create a new user if the username or email is taken', async () => {
      const user = await request(SUT).post('/api/users/').send(userPayload); // recreating the same user as above

      expect(user.status).toBe(409);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('GET:/api/users/:id', () => {
    it('should retrieve a user by id', async () => {
      const newUser = await request(SUT).get(`/api/users/${user.body._id}`);

      userProps.forEach((p) => expect(newUser.body).toHaveProperty(p));
      expect(newUser.body.username).toBe('admin_user_test');
    });

    it('should return a status 404 if no user is found with the given id', async () => {
      const user = await request(SUT).get(
        `/api/users/5ee17b00d1fccf00d2b39194`,
      );

      expect(user.status).toBe(404);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('GET:/api/users/u/:username', () => {
    it('should retrieve a user by username', async () => {
      const user = await request(SUT).get(`/api/users/u/admin_user_test`);

      userProps.forEach((p) => expect(user.body).toHaveProperty(p));
      expect(user.body.username).toBe('admin_user_test');
    });

    it('should return a status 404 if no user is found with the given username', async () => {
      const user = await request(SUT).get(`/api/users/u/inexistentUser`);

      expect(user.status).toBe(404);
      expect(user.body).toHaveProperty('error');
    });
  });

  describe('PUT:/api/users/follow/:followToUsername', () => {
    it('should follow a user by username', async () => {
      const follow = await request(SUT)
        .put('/api/users/follow/secondUser')
        .set('Cookie', cookieSet);

      const { body } = follow;
      expect(body).toHaveProperty('following');
      expect(body).toHaveProperty('follower');
      expect(body.follower.followers).toContain(user.body._id);
      expect(body.following.following).toContain(secUser.body._id);
    });

    it('should tell if the user is trying to follow an inexistent account', async () => {
      const follow = await request(SUT)
        .put('/api/users/follow/noUserAtAll')
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(404);
      expect(follow.body).toHaveProperty('error');
    });

    it('should not allow the user to follow their own account', async () => {
      const follow = await request(SUT)
        .put('/api/users/follow/admin_user_test')
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(409);
      expect(follow.body).toHaveProperty('error');
    });

    it('should not allow the user follow an account they already follow', async () => {
      const follow = await request(SUT)
        .put('/api/users/follow/secondUser') // already following on first it()
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(409);
      expect(follow.body).toHaveProperty('error');
    });
  });

  describe('PUT:/unfollow/:followToUsername', () => {
    it('should unfollow a user by username', async () => {
      const follow = await request(SUT)
        .put('/api/users/unfollow/secondUser')
        .set('Cookie', cookieSet);

      const { body } = follow;
      expect(body).toHaveProperty('following');
      expect(body).toHaveProperty('follower');
      expect(body.follower.followers).not.toContain(user.body._id);
      expect(body.following.following).not.toContain(secUser.body._id);
    });

    it('should tell if the user is trying to unfollow an inexistent account', async () => {
      const follow = await request(SUT)
        .put('/api/users/unfollow/noUserAtAll')
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(404);
      expect(follow.body).toHaveProperty('error');
    });

    it('should not allow the user to unfollow their own account', async () => {
      const follow = await request(SUT)
        .put('/api/users/unfollow/admin_user_test')
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(409);
      expect(follow.body).toHaveProperty('error');
    });

    it('should not allow the user unfollow an account they do not follow', async () => {
      const follow = await request(SUT)
        .put('/api/users/unfollow/secondUser') // already unfollowed on first it()
        .set('Cookie', cookieSet);

      expect(follow.status).toBe(409);
      expect(follow.body).toHaveProperty('error');
    });
  });

  describe('DELETE:/api/users/', () => {
    it('should delete a user', async () => {
      const userToDelete: any = await request(SUT).post('/api/users/').send({
        name: 'Tsseract',
        username: 'delete_user_test',
        password: 'Admin.1234',
        email: 'delete_user_test@tsseract.com',
        birthDate: Date.now(),
      });
      const [newCookie] = setCookie.parse(userToDelete);

      const deleted = await request(SUT)
        .delete(`/api/users/`)
        .set('Cookie', [`${newCookie.name}=${newCookie.value}`]);

      expect(deleted.status).toBe(200);
    });
  });
});