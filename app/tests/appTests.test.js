const db = require('../models/index.js');
// const { makeApp } = require('../app.js');
const { app } = require('../app.js');
const request = require("supertest");

// let app;

beforeAll(async () => {
    await db.createDatabaseIfNotPresent();
    // app = await makeApp(db);
    await app;
});

// Assignment #03
{
  const userObj = {
    first_name: "Vishvesh",
    last_name: "Panchal",
    username: "vap-test-1@gmail.com",
    password: "vap@10",
  };

  test("Test 1 - Create an account, and using the GET call, validate account exists.", async () => {
    const postCreateUserResponse = await request(app)
      .post("/v1/user")
      .send(userObj)
      .set("Accept", "application/json")
      .expect("Cache-Control", /no-cache, must-revalidate/)
      .expect(201);

    delete postCreateUserResponse.body.account_created;
    delete postCreateUserResponse.body.account_updated;

    const getGetUserResponse = await request(app)
      .get("/v1/user/self")
      .auth(userObj.username, userObj.password)
      .expect("Cache-Control", /no-cache, must-revalidate/)
      .expect(200);

    delete getGetUserResponse.body.account_created;
    delete getGetUserResponse.body.account_updated;

    expect(postCreateUserResponse.body).toEqual(getGetUserResponse.body);
  });

  test("Test 2 - Update the account and using the GET call, validate the account was updated.", async () => {
    const updatedUserObj = {
      first_name: "Vishvesh-UPDATED",
      last_name: "Panchal-UPDATED",
      password: "vap@10-UPDATED",
    };

    const putUpdateUserResponse = await request(app)
      .put("/v1/user/self")
      .auth(userObj.username, userObj.password)
      .send(updatedUserObj)
      .set("Accept", "application/json")
      .expect("Cache-Control", /no-cache, must-revalidate/)
      .expect(204);

    const getGetUserResponse = await request(app)
      .get("/v1/user/self")
      .auth(userObj.username, updatedUserObj.password)
      .expect("Cache-Control", /no-cache, must-revalidate/)
      .expect(200);

    expect(updatedUserObj.first_name).toEqual(getGetUserResponse.body.first_name);
    expect(updatedUserObj.last_name).toEqual(getGetUserResponse.body.last_name);
  });
}

afterAll(async () => {
  await db.closeDatabaseConnection();
});
