const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { test, expect } = require('@jest/globals')

const api = supertest(app)

let token

beforeEach(async () => {
  supertest(app)
  .post('/api/login')
  .send({
    "username": "test_user",
    "password": "test_password"
  })
  .end((err, response) => {
    token = response.body.token
  })

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)


})

describe('total likes', () => {
  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has multiple blogs, can find the favorite', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual(  { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, __v: 0 
    })
  })
})

describe('most blogs', () => {
  test('returns favorite author and number of blogs for them', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual(  {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('addition of a new blog', () => {
  test('it should require authorization', async () => {
    const newBlog = { 
      title: "Testing post method", 
      author: "James Lipe", 
      url: "www.test.com", 
      likes: 44
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('post request saves blog to database', async () => {
    // This test has hardcoded admin as user
    const newBlog = { 
      title: "Testing post method", 
      author: "James Lipe", 
      url: "www.test.com", 
      likes: 44
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const newBlogs = await api.get('/api/blogs')
    expect(newBlogs.body.length).toBe(helper.initialBlogs.length + 1)
    const newBlogsTitles = newBlogs.body.map(blog => blog.title)
    expect(newBlogsTitles).toContain('Testing post method')
  })

  test('expect undefined like value to default to zero', async () => {
    const newBlog = {
      title: "Testing likes default", 
      author: "James Lipe", 
      url: "www.likes.com"
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })
  
  test('title and url missing results in 400', async () => {
    const noTitle = {
      author: "James",
      url: "www.notitle.com"
    }

    const noUrl = {
      title: "this has no url",
      author: "lipey"
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noTitle)
      .expect(400)

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noUrl)
      .expect(400)
  })
})

describe('viewing blogs', () => {
  test('GET request returns all blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)
    expect(contents.length).toEqual(helper.initialBlogs.length)
  })

  test('unique identifier is labeled id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('when multiple blogs are in the database', () => {
  test('delete a single blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('update likes for a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = blogToUpdate.likes + 20

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)


    const blogAtEnd = await Blog.findById(blogToUpdate.id)
    expect(blogAtEnd.likes).toEqual(blogToUpdate.likes)
  })
})


// describe('most likes', () => {
//   test('returns number of likes of author with most likes', () => {
//     const result = listHelper.mostLikes(blogs)
//     expect(result).toEqual({
//       author: "Edsger W. Dijkstra",
//       likes: 17
//     })
//   })
// })

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })



afterAll(() => {
  mongoose.connection.close()
})