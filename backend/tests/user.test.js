const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe("invalid add user operation returns suitable status code", () => {
  test("username under 3 characters", async () => {
    const usersAtStart = await helper.usersInDb()
    const shortUsername = new User({
      username: "j",
      name: "James Brown",
      password: "hellokitty"
    })

    const shortPassword = new User({
      username: "jimmy123456",
      name: "James Smith",
      password: "hi"
    })

    await api.post('/api/users').send(shortUsername).expect(500)
    await api.post('/api/users').send(shortPassword).expect(500)

    const usersAtEnd = await helper.usersInDb()

  })
})

afterAll(() => {
  mongoose.connection.close()
})