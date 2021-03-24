import React from 'react'


const User = ({ blogs }) => {
  const userCount = {}
  for (let blog of blogs) {
    if (blog.user.username in userCount) {
      userCount[blog.user.username]++
    } else {
      userCount[blog.user.username] = 1
    }
  }

  console.log('uc', userCount)
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {Object.keys(userCount).map(name => {
          return (
            <li key={name}>
              {name} {userCount[name]}
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default User