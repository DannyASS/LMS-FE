import {getListCourseEndpoint, getCourseEndpoint, updateCourseEndpoint, createCourseEndpoint } from "@/utils/api/endpoint"

const GetListCorseUtils = async (params) => {
    try {
        const response = await getListCourseEndpoint(params)
        return response?.data
        
    } catch (error) {
        console.error(error.Message)
    }
    
}


const GetCourseUtils = async (id) => {
    try {
        const response = await getCourseEndpoint(id)
        return response       
    } catch (error) {
        console.error(error.Message)
    }
    
}

const updateCourseUtils = async (id, body) => {
    try {
        const response = await updateCourseEndpoint(id, body)
        return response
        
    } catch (error) {
        console.error(error.Message)
    }
    
}

const createCourseUtils = async (body) => {
    try {
        const response = await createCourseEndpoint(body)
        return response
        
    } catch (error) {
        console.error(error.Message)
    }
    
}


export {
    GetListCorseUtils,
    GetCourseUtils,
    updateCourseUtils,
    createCourseUtils
    
}