import request from "../../helper/api";



const loginEndpoint = (body) => {
   return request(
        {
            url: '/api/v1/user/login',
            method: 'post',
            data: body
        },"login"
    )
}

const logoutEndpoint = () => {
   return request(
        {
            url: '/api/v1/user/logout',
            method: 'post',
        }
    )
}

const RegisterEndpoint = (body) => {
   return request(
        {
            url: '/api/v1/user/register',
            method: 'post',
            data: body
        },"login"
    )
}

const createCourseEndpoint = (body) => {
   return request(
        {
            url: '/api/v1/course/create/',
            method: 'post',
            data: body
        }
    )
}

const getListCourseEndpoint = (param) => {
   return request(
        {
            url: '/api/v1/course/',
            method: 'get',
            params: param
        },
    )
}

const getCourseEndpoint = (id) => {
   return request(
        {
            url: `/api/v1/course/${id}`,
            method: 'get',
        },
    )
}

const updateCourseEndpoint = (id, data) => {
   return request(
        {
            url: `/api/v1/course/update/${id}`,
            method: 'Put',
            data: data
        },
    )
}

// CREATE MODULE
const createModuleEndpoint = (body) => {
    return request({
        url: '/api/v1/modules/create',
        method: 'post',
        data: body
    })
}

// GET LIST MODULE
const getListModuleEndpoint = (params) => {
    return request({
        url: '/api/v1/modules/',
        method: 'get',
        params: params
    })
}

// GET LIST COURSE INSIDE MODULE
const getListCourseInModuleEndpoint = () => {
    return request({
        url: '/api/v1/modules/course',
        method: 'get'
    })
}

// GET MODULE BY ID
const getModuleEndpoint = (id) => {
    return request({
        url: `/api/v1/modules/${id}`,
        method: 'get'
    })
}

// UPDATE MODULE
const updateModuleEndpoint = (id, data) => {
    return request({
        url: `/api/v1/modules/update/${id}`,
        method: 'put',
        data: data
    })
}

const getListUserEndpoint = (param) => {
    return request({
        url: `/api/v1/user/getuserole`,
        method: "get",
        params: param
    })
}

const getListClassesEndpoint = (param) => {
    return request({
        url: '/api/v1/class/',
        method: 'get',
        params: param
    })
}

const getListAllTeacherEndpoint = () => {
    return request({
        url: '/api/v1/user/all-teacher',
        method: 'get',
    })
}

const downloadTemplateStudentEndpoint = () => {
    return request({
        url: '/api/v1/class/template/download',
        method: 'get',
        responseType: 'blob'
    })
}

const updateClassEndpoint = (formData, id) => {
  return request({
    url: `/api/v1/class/${id}`,
    method: "put",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // kalau backend pakai cookie
  });
};

const createClassEndpoint = (body) => {
    return request({
        url: '/api/v1/class/',
        method: 'post',
        data: body
    })
}

const getClassByIDEndpoint = (id) => {
    return request({
        url: `/api/v1/class/${id}`,
        method: 'get',
    })
}

const getStudentClassByIDEndpoint = (id) => {
    return request({
        url: `/api/v1/student/class/${id}`,
        method: 'get',
    })
}

const deleteStudentClassByIDClassEndpoint = (id) => {
    return request({
        url: `/api/v1/student/class/${id}`,
        method: 'delete',
    })
}

const deleteStudentClassByIDEndpoint = (id) => {
    return request({
        url: `/api/v1/student/${id}`,
        method: 'delete',
    })
}

const ImportEndpoint = (param) => {
    return request({
        url: `/api/v1/import`,
        method: 'get',
        params: param
    })
}

const downloadTemplateCourseEndpoint = () => {
    return request({
        url: '/api/v1/courses/template/download',
        method: 'get',
        responseType: 'blob'
    })
}

const getCourseClassByIDEndpoint = (id) => {
    return request({
        url: `/api/v1/courses/class/${id}`,
        method: 'get',
    })
}



export{
    loginEndpoint,
    getListCourseEndpoint,
    getCourseEndpoint,
    updateCourseEndpoint,
    createCourseEndpoint,
    createModuleEndpoint,
    getListModuleEndpoint,
    getModuleEndpoint,
    updateModuleEndpoint,
    getListCourseInModuleEndpoint,
    getListUserEndpoint,
    RegisterEndpoint,
    getListClassesEndpoint,
    logoutEndpoint,
    getListAllTeacherEndpoint,
    downloadTemplateStudentEndpoint,
    updateClassEndpoint,
    createClassEndpoint,
    getClassByIDEndpoint,
    getStudentClassByIDEndpoint,
    deleteStudentClassByIDClassEndpoint,
    deleteStudentClassByIDEndpoint,
    ImportEndpoint,
    downloadTemplateCourseEndpoint,
    getCourseClassByIDEndpoint
}