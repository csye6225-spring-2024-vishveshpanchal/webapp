const db = require('../models/index.js');
const { makeApp } = require('../app.js');
const request = require("supertest");

let app;

beforeAll(async () => {
    app = await makeApp(db);
});

const userBody = {
    first_name: "vishvesh",
    last_name: "panchal",
    username: "rajesh101@gmail.com",
    password: "rajesj@10",
};

test("Test 1 - Create an account, and using the GET call, validate account exists.", async () => {
  const postRes = await request(app)
    .post("/v1/user")
    .send(userBody)
    .set("Accept", "application/json")
    .expect("Cache-Control", /no-cache, must-revalidate/)
    .expect(201);

  delete postRes.body.account_created;
  delete postRes.body.account_updated;

  const getRes = await request(app)
    .get("/v1/user/self")
    .auth(userBody.username, userBody.password)
    .expect("Cache-Control", /no-cache, must-revalidate/)
    .expect(200);

  delete getRes.body.account_created;
  delete getRes.body.account_updated;

  expect(postRes.body).toEqual(getRes.body);
});

test("Test 2 - Update the account and using the GET call, validate the account was updated.", async () => {
  const updatedUserBody = {
    first_name: "Vicky",
    last_name: "Grivar",
    password: "newpassword",
  };

  const putRes = await request(app)
    .put("/v1/user/self")
    .auth(userBody.username, userBody.password)
    .send(updatedUserBody)
    .set("Accept", "application/json")
    .expect("Cache-Control", /no-cache, must-revalidate/)
    .expect(204);

  const getRes = await request(app)
    .get("/v1/user/self")
    .auth(userBody.username, updatedUserBody.password)
    .expect("Cache-Control", /no-cache, must-revalidate/)
    .expect(200);

  expect(updatedUserBody.first_name).toEqual(getRes.body.first_name);
  expect(updatedUserBody.last_name).toEqual(getRes.body.last_name);
});

afterAll(async () => {
    await db.sequelize.close();
});

// const supertest = require('supertest');

// const db = require('../models/index.js');
// const { makeApp } = require('../app.js');

// describe('POST GET /v1/user', () => {
//     test("Application Test 3", async () => {
//         try {
//             const app = await makeApp(db);
//             expect.assertions(1);
//             expect(5 + 1).toBe(6);
//         } catch (error) {
//             console.log("error thrown for Application Test 3");
//         }
//       });
// });

