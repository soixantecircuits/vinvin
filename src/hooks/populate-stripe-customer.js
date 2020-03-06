// src/hooks/populate-stripe-customer.js
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let stripeId = context.result.stripeId
    if (stripeId) {
      let customer = await context.app.service('stripe/customers').get(stripeId)
      context.result.stripe = customer
    }
    return context
  }
}
