require('dotenv').config();

const request = require('supertest');

const server = require('../server');
const db = require('../../data/dbConfig');

describe('Authentication', function() {

    describe('API is up and running', function() {
        it('should return 200 OK', function() {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.type).toMatch(/json/i);
                    expect(res.body.message).toBe("Droom app backend up and running");
                })
        })
    });


    describe('Creating a new User', function() {
        const newUser = {
            username: "thetestinguser",
            password: "testing123!",
            user_type: 1,
            name: "Mr. Test User",
            experience: "a lot... really I have a lot.", 
            industry: "Fashion, food, dancing",
            imgUrl: "https://www2.pictures.zimbio.com/mp/xY7Vx3kjGvml.jpg"
        }

        let userAuth;

        it.skip('register new user', function() {
            return request(server).post('/api/register/user')
                .send(newUser)
                .then(res => {
                    expect(res.status).toBe(201);
                    expect(res.type).toMatch(/json/i);
                })
        });

        it('login new user', function() {
            return request(server)
                .post('/api/login')
                .send({username: newUser.username, password: newUser.password})
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.type).toMatch(/json/i);
                    userAuth = res.body.token;
                })
        });
    })

    describe('Create a new Company', function() {
        const newCompany = {
            username: "somecompany",
            password: "testing123!",
            user_type: 0,
            company_name: "Some Company",
            description: "This is a placeholding company",
            industry: "Tech, Foodie",
            mission_statement: "To eat the tech we build",
            imgUrl: "",
            openPositions: "Chef, Fullstack, foodie"
        }

        let compnayAuth;

        it.skip('register new company', function() {
            return request(server).post('/api/register/company')
                .send(newCompany)
                .then(res => {
                    expect(res.status).toBe(201);
                    expect(res.type).toMatch(/json/i);
                })
        })

        it('login as new company', function() {
            return request(server)
                .post('/api/login')
                .send({username: newCompany.username, password: newCompany.password })
                .then(res => {
                    expect(res.status).toEqual(201);
                    expect(res.type).toMatch(/json/i);
                    expect(res.body.company.user_type).toBe(0);
                    userAuth = res.body.token;
                })
        })
    })
})