const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7, 
    __v: 0,
    user: "60203acf4dc4d1085e32edb8"
  }, 
  { 
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, __v: 0 
  }, 
  { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, __v: 0 
  }, 
  { 
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, __v: 0 
  }, 
  { 
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

const initialUsers = [
  {
    _id: "600fcabeb9966cb874d7390d",
    username: "Jammyjo",
    name:"jagihsa",
    passwordHash:"$2b$10$4hvuXfxV.FJgx8sJ.7NYPOqb389VrkBrxLORgt/DUP8CvYwawCgB2",
    __v: 0
  },
  {
    _id: "600fcac4b9966cb874d7390e",
    username: "RockyB",
    name:"asgdag",
    passwordHash:"$2b$10$AvQ3OE77GTRk1R86jefT9OepFD7utfxyo6.wdAMWV.KRptMaVA6N2",
    __v: 0
  },
  {
    _id: "60203acf4dc4d1085e32edb8",
    username: "test_user",
    passwordHash: "$2b$10$YKQPGse7PCZOjZ7dL15Z0.9f8wVyRyQrsaEJP8WpeWSrd5ixWdvdO",
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}