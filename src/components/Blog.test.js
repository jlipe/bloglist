import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blog to test',
      author: 'James Lipe',
      url: 'http://www.myblogtest.com',
      user: {
        username: 'jimmyjo12321'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('shows title and author and not url and not username', () => {
    const titleAndAuthor = component.container.querySelector('div')
    const urlAndUser = component.container.querySelector('.blogUrlAndUser')

    expect(titleAndAuthor).toHaveTextContent(
      'Blog to test James Lipe'
    )

    expect(urlAndUser).toHaveStyle('display: none')
  })

  test('url and number of likes are shown when button is pressed', () => {
    const button = component.container.querySelector('.toggleBlog')
    expect(button).toHaveTextContent('show')
    fireEvent.click(button)
    expect(button).toHaveTextContent('hide')
    const urlAndUser = component.container.querySelector('.blogUrlAndUser')
    expect(urlAndUser).not.toHaveStyle('display: none')
    expect(urlAndUser).toHaveTextContent('http://www.myblogtest.com')
  })

  test('like button', () => {
    const blog = {
      title: 'Blog to test',
      author: 'James Lipe',
      url: 'http://www.myblogtest.com',
      user: {
        username: 'jimmyjo12321'
      }
    }
    const likeButton = jest.fn()
    component = render(
      <Blog blog={blog} updateLikes={likeButton} />
    )
    const button = component.container.querySelector('.likeButton')

    fireEvent.click(button)
    fireEvent.click(button)
    expect(likeButton.mock.calls).toHaveLength(2)
  })
})