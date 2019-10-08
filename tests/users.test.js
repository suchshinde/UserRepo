const request=require('supertest');
const app = require('../app');
const jwt=require('jsonwebtoken');
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzA1MTgwOTAsImV4cCI6MTU3MDUzNjA5MH0.68DGx8Ca5jf7k-jHwVJVVy1VeL3wuhvOUSo9ZcmAJZE';

test('Should Creat New User ', async () => {
    await request(app).post('/users').send({
        user: {
            firstname: 'testUser',
            lastname: 'testLN',
            email: 'abc@gmail.com',
            address: 'Nashik',
            mobile: 7588552943
        }
    }).expect(200);
});


test('Should Get All Users From Firebase ', async () => {
    await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200);
});
