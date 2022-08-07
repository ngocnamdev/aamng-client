import api from './api'

export const loginWithGen = async (gen: string, password: string) => {
  try {
    const result = await api({
      method: 'post',
      url: 'login/gen',
      data: {
        gen: gen,
        password: password
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const loginWithSingle = async (single: string, password: string) => {
  try {
    const result = await api({
      method: 'post',
      url: 'login/single',
      data: {
        single: single,
        password: password
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getEmployeeById = async (id: string) => {
  try {
    const result = await api({
      method: 'get',
      url: 'employees/' + id,
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const createEmployee = async () => {
  try {
    const result = await api({
      method: 'post',
      url: 'employees',
      data: {}
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
