import env from '../constants'

/**
 * Converts error to a string, adds
 * name property to avoid toString error
 * @param {Object} e
 * @returns {string} errorCode
 */
const errorToString = (e) => {
  e.name = ''
  return e.toString()
}

class Auth {
  /**
   * Handles error if success is not present on response object.
   * @param {Object} response
   */
  handleError(response) {
    if (!response.success && response.errorCode) throw Error(response.errorCode)

    if (!response.success) throw Error('content.login.errors.generic')

    return response
  }

  /**
   * Wraps login API call in a Promise and processes response
   * @param {string} loginId
   * @param {string} password
   */
  login(loginId, password) {
    return new Promise((resolve, reject) => {
      fetch(`${env.base_url}/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginId,
          password,
        }),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then(this.handleError)
        .then((data) => {
          localStorage.setItem('attemptSilentLogin', true)

          return resolve(data)
        })
        .catch((e) => {
          if (errorToString(e) === 'invalid_grant')
            return reject('content.login.errors.incorrectCreds')

          return reject(e)
        })
    })
  }

  /**
   * Retrieves the current logged in user
   */
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      fetch(`${env.base_url}/api/user`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((user) => {
          return resolve(user)
        })
        .catch(() => {
          return reject()
        })
    })
  }

  /**
   * Retrieves the current logged in user
   */
  logout() {
    return new Promise((resolve, reject) => {
      fetch(`${env.base_url}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then(() => {
          localStorage.setItem('attemptSilentLogin', false)

          return resolve()
        })
        .catch((e) => {
          return reject()
        })
    })
  }
}

const AuthClient = new Auth()

export default AuthClient
