describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { username: 'testing', password:'testingPW', name: 'demo_user' }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is showed', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with valid credentials', () => {
      cy.get('input:first').type('testing')
      cy.get('input:last').type('testingPW')
      cy.contains('login').click()

      cy.contains('testing logged in')
    })

    it('fails with invalid credentials', () => {
      cy.get('input:first').type('test_user')
      cy.get('input:last').type('wrong_password')
      cy.contains('login').click()

      cy.get('.error').should('contain', 'Invalid login')
      cy.get('html').should('not.contain', 'test_user logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testing', password: 'testingPW' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogForm').as('blogForm')
      cy.get('@blogForm').get('#text').type('this is a test blog')
      cy.get('@blogForm').get('#author').type('Jimmy Jo')
      cy.get('@blogForm').get('#url').type('http://www.testing.com')
      cy.get('@blogForm').submit()

      cy.get('#blogList').contains('this is a test blog')
    })

    describe('and blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'ralph lipe', url: 'http://www.lipe.ws' })
        cy.createBlog({ title: 'second blog', author: 'james lipe', url: 'http://www.lipe2.ws' , likes: 100 })
        cy.createBlog({ title: 'third blog', author: 'lynda lipe', url: 'http://www.lipe1.ws', likes: 50 })
        cy.createBlog({ title: 'fourth blog', author: 'nicole lipe', url: 'http://www.lipe4.ws', likes: 75 })
      })

      it('logged in user can like a blog', function() {
        cy.get('#blogList').contains('show').click()
        cy.contains('Likes 0')
        cy.get('#likeButton').click()
        cy.get('.blog').should('contain', 'Likes 1')
      })

      it('logged in user can delete their blog', function() {
        cy.get('#blogList').contains('show').click()
        cy.get('#blogList').should('contain', 'first blog')
        cy.get('#delete').click()
        cy.get('#blogList').should('not.contain', 'first blog')
        cy.get('html').should('contain', 'first blog successfully removed')
      })

      it('sorts blogs by likes', function() {
        cy.get('.blog').find('#likes')
          .then(blogs => {
            let initialBlogOrdering = []
            blogs.map((i, blog) => {
              initialBlogOrdering.push(+blog.textContent)
            })
            expect(initialBlogOrdering).to.have.ordered.members([0, 100, 50, 75])
          })

        cy.get('#sortBlogsByLikes').click()
        cy.get('.blog').find('#likes')
          .then(blogs => {
            let initialBlogOrdering = []
            blogs.map((i, blog) => {
              initialBlogOrdering.push(+blog.textContent)
            })
            expect(initialBlogOrdering).to.have.ordered.members([100, 75, 50, 0])
          })
      })
    })
  })
})