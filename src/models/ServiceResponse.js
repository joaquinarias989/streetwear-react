class ServiceResponse {
  constructor (data = null, success = true, message = '') {
    this.data = data
    this.success = success
    this.message = message
  }
}

export default ServiceResponse
