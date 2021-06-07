const app = require('../src/app');
const request = require('supertest');
const User = require('../src/models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@test.com',
    password: 'mIke123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    }],
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});


test('Should signup a new user', async () => {
    await request(app).post(
        '/users'
    ).send({
        name: 'Tester',
        email: 'Test.test@gmail.com',
        password: 'Pass123'
    }
    ).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user',async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});