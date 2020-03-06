/* eslint-disable no-unused-vars */
const Stripe = require('stripe')
const { URL } = require('url')

exports.Subscription = class Subscription {
  constructor (options) {
    this.options = options || {}
  }

  setup (app) {
    this.app = app
    this.config = app.get('stripe')
    this.stripe = new Stripe(this.config.secretKey)
  }

  async create (data, params) {
    const session = await this.stripe.checkout.sessions.create({
      customer: params.user.stripeId,
      payment_method_types: ['card'],
      subscription_data: {
        items: [{
          plan: this.config.plan
        }]
      },
      success_url: new URL('#/success?session_id={CHECKOUT_SESSION_ID}', this.config.redirect).toString(),
      cancel_url: new URL('/#/cancel', this.config.redirect).toString()
    })
    data = { ...data, ...session }
    return data
  }
}
