const users = require('./users/users.service.js')
const subscription = require('./subscription/subscription.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(subscription);
}
