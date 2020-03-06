const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const createStripeCustomer = require('../../hooks/create-stripe-customer')

const populateStripeCustomer = require('../../hooks/populate-stripe-customer');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), createStripeCustomer()],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [populateStripeCustomer()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
