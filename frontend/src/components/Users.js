import React from 'react'
import { Table } from 'react-bootstrap'

import { Link } from 'react-router-dom'


const User = ({ blogs }) => {
  const userCount = {}
  for (let blog of blogs) {
    if (blog.user.username in userCount) {
      userCount[blog.user.username].count++
    } else {
      userCount[blog.user.username] = { count: 1, id: blog.user.id }
    }
  }
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th># blogs added</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userCount).map(name => {
            return (
              <tr key={userCount[name].id}>
                <td>
                  <Link to={`/users/${userCount[name].id}`}>
                    {name}
                  </Link>
                </td>
                <td>{userCount[name].count}</td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default User