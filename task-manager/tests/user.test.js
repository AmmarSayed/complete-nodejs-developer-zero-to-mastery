require("dotenv").config({ path: "./config/test.env" });
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { use } = require("../src/app");
/////

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Ammar",
  email: "ammar@non.com",
  password: "MyPassWo777!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwo = {
  name: "ali",
  email: "ammar@nono.com",
  password: "MyPassWo777!",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Signup a new user", async () => {
  const res = await request(app).post("/users").send(userTwo).expect(201);
  // Assert that the database was changed successfully

  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  // expect(res.body.user.name).toBe("ali");
  expect(res.body).toMatchObject({
    user: {
      name: "ali",
      email: "ammar@nono.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("MyPassWo777");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);

  // Assert that the second token in the database matches the token in the response
  expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should not login non-existing users", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "ali ali",
      password: "message@mon.cm",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app).get("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app).delete("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).send().expect(200);

  // Assert user to be deleted from the database
  const user = await User.findById(userOneId);
  expect(user).toBe(null);
});

test("Should NOT delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
