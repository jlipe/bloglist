const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes
    ? prev
    : current
  }
  
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const authorsCount = _.countBy(blogs, "author")
  let favoriteAuthor
  let max = null
  for (author in authorsCount) {
    if (authorsCount[author] > max) {
      max = authorsCount[author]
      favoriteAuthor = author
    }
  }
  return { author: favoriteAuthor, blogs: max }
}

const mostLikes = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, "author")
  const likeCount = _.countBy(groupedAuthors, "likes")
  console.log(likeCount)
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

