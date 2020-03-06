import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

class Subscription extends BaseModel {
  static modelName = 'Subscription'
}
const servicePath = 'subscription'
const servicePlugin = makeServicePlugin({
  Model: Subscription,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
