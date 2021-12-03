import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with correct info when blog is created', () => {
    const onBlogSubmit = jest.fn()
    let component = render(<BlogForm handleSubmit={onBlogSubmit} />)
    const text = component.container.querySelector('#text')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#blogForm')

    fireEvent.change(text, {
      target: { value: 'a blog to test' }
    })
    fireEvent.change(author, {
      target: { value: 'James Lipe' }
    })
    fireEvent.change(url, {
      target: { value: 'http://www.google.com' }
    })

    fireEvent.submit(form)
    expect(onBlogSubmit.mock.calls).toHaveLength(1)
    expect(onBlogSubmit.mock.calls[0][0]).toStrictEqual({
      title: 'a blog to test',
      author: 'James Lipe',
      url: 'http://www.google.com',
      user: undefined
    })
  })
})