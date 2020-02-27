// src/store/services/users.js
import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

class User extends BaseModel {
  static modelName = 'User'
}
const servicePath = 'users'
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
