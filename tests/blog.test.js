const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { test, expect } = require('@jest/globals')

const api = supertest(app)


beforeEach(async () => {
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

describe('/api/blogs', () => {
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

  test('post request saves blog to database', async () => {
    const newBlog = { 
      title: "Testing post method", 
      author: "James Lipe", 
      url: "www.test.com", 
      likes: 44
    }

    await api.post('/api/blogs')
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
      .send(noTitle)
      .expect(400)

    await api.post('/api/blogs')
    .send(noUrl)
    .expect(400)
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