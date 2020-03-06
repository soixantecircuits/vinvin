// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let customer = await context.app.service('stripe/customers').create({
      email: context.data.email
    })
    context.data.stripeId = customer.id
    return context
  }
}
