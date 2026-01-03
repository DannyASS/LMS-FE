import { createClassEndpoint, deleteStudentClassByIDClassEndpoint, deleteStudentClassByIDEndpoint, downloadTemplateCourseEndpoint, downloadTemplateStudentEndpoint, getClassByIDEndpoint, getCourseClassByIDEndpoint, getListAllTeacherEndpoint, getListClassesEndpoint, getStudentClassByIDEndpoint, ImportEndpoint, updateClassEndpoint } from "@/utils/api/endpoint"

const getListClassesUtils = async(params) => {
    try {
        const data = await getListClassesEndpoint(params)
        return data?.data
    } catch (error) {
        console.error(error)
    }
}

const getListAllTeacherUtils = async() => {
    try {
        const data = await getListAllTeacherEndpoint()
        return data?.data
    } catch (error) {
        console.error(error)
    }
}

const downloadTemplateStudentUtils = async() => {
    try {
    const response = await downloadTemplateStudentEndpoint(); // ini akan return blob
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_import_student.xlsx'); // nama file
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}

const createClassUtils = async(data) => {
    try {
        const response = await createClassEndpoint(data)
        return response
    } catch (error) {
        console.error(error)
    }
}

const updateClassUtils = async(data, id) => {
    try {
        const response = await updateClassEndpoint(data, id)
        return response
    } catch (error) {
        console.error(error)
    }
}

const getDataByIdUtils = async(id) => {
    try {
        const response = await getClassByIDEndpoint(id)
        return response
    } catch (error) {
        console.error(error)
    }
}

const getStudentClassDataByIdUtils = async(id) => {
    try {
        const response = await getStudentClassByIDEndpoint(id)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

const deleteStudentClassByIDClassUtils = async(id) => {
    try {
        const response = await deleteStudentClassByIDClassEndpoint(id)
        return response
    } catch (error) {
        console.error(error)
    }
}

const deleteStudentClassByIDUtils = async(id) => {
    try {
        const response = await deleteStudentClassByIDEndpoint(id)
        return response
    } catch (error) {
        console.error(error)
    }
}

const ImportStatusUtils = async(param) => {
    try {
        const response = await ImportEndpoint(param)
        if (response.status_code == 200) {
            return response?.data
        }
        return null
    } catch (error) {
        console.error(error)
    }
}

const getCourseClassDataByIdUtils = async(id) => {
    try {
        const response = await getCourseClassByIDEndpoint(id)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

const downloadTemplateCourseUtils = async() => {
    try {
    const response = await downloadTemplateCourseEndpoint(); // ini akan return blob
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_import_courses.xlsx'); // nama file
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}


export {
    getListClassesUtils,
    getListAllTeacherUtils,
    downloadTemplateStudentUtils,
    createClassUtils,
    updateClassUtils,
    getDataByIdUtils,
    getStudentClassDataByIdUtils,
    deleteStudentClassByIDClassUtils,
    deleteStudentClassByIDUtils,
    ImportStatusUtils,
    downloadTemplateCourseUtils,
    getCourseClassDataByIdUtils
}