import { 
    getListModuleEndpoint, 
    getModuleEndpoint, 
    updateModuleEndpoint, 
    createModuleEndpoint, 
    getListCourseInModuleEndpoint
} from "@/utils/api/endpoint"

// GET LIST
const GetListModuleUtils = async (params) => {
    try {
        const response = await getListModuleEndpoint(params)
        return response?.data
    } catch (error) {
        console.error(error?.Message)
    }
}

// GET DETAIL MODULE
const GetModuleUtils = async (id) => {
    try {
        const response = await getModuleEndpoint(id)
        return response
    } catch (error) {
        console.error(error?.Message)
    }
}

// UPDATE MODULE
const updateModuleUtils = async (id, body) => {
    try {
        const response = await updateModuleEndpoint(id, body)
        return response
    } catch (error) {
        console.error(error?.Message)
    }
}

// CREATE MODULE
const createModuleUtils = async (body) => {
    try {
        const response = await createModuleEndpoint(body)
        return response
    } catch (error) {
        console.error(error?.Message)
    }
}


const getCourseModuleUtils = async () => {
    try {
        const response = await getListCourseInModuleEndpoint()
        return response?.data
    } catch (error) {
        
    }
}

export {
    GetListModuleUtils,
    GetModuleUtils,
    updateModuleUtils,
    createModuleUtils,
    getCourseModuleUtils
}
