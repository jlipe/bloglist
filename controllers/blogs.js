const blogsRouter = require('express').Router()
const { json } = require('body-parser')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()

  response.json(savedBlog)
})

module.exports = blogsRouter