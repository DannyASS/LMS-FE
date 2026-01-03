import { getListUserEndpoint } from "@/utils/api/endpoint"

const getListUserUtils = async (params) => {
    try{
        const data = await getListUserEndpoint(params)
        return data?.data
    } catch (e) {
        return console.error(e)
    }
}


export{
    getListUserUtils
}