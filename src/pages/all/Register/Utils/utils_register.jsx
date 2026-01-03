import { RegisterEndpoint } from "@/utils/api/endpoint"

const registerUtils = async (data) => {
    try {
        const response = await RegisterEndpoint(data)
        return response
    } catch (error) {
        console.error(error)
    }
}


export{
    registerUtils
}