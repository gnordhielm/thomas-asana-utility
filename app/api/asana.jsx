var Asana = require('asana')

// Configuration - move out to .env file
export const CLIENT_ID = '344321689330782'
export const CLIENT_SECRET = '3bc83775e039d433df8c48a275387f30'
export const REDIRECT_URI = 'http://localhost:5000/projects'
export const AUTH_ENDPOINT = `https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${344321689330782}&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fprojects`
