import { loginEndpoint } from "../../../../utils/api/endpoint"

const loginUtils = async (body) => {
    try {
        const data = await loginEndpoint(body)
        return data?.data
    } catch (err) {
        return console.error(err.message)
    }
}

export {
    loginUtils
}