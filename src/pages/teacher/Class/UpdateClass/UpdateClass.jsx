import ContainerMution from "@/compenent/partial/ContainerCustom"
import PageStandart from "@/compenent/partial/PageStandart"
import Tabs from "@/compenent/partial/Tabs"
import ConfigureClass from "./component/ConfigureClass"
import StudentClass from "./component/StudentClass"
import CourseClass from "./component/CourseClass"
import Button from "@/compenent/partial/Button"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getDataByIdUtils, getListAllTeacherUtils, updateClassUtils } from "../Utils/utils_class"
import { useNavigate, useParams } from "react-router-dom"
import { resetClassState, setConfigClass } from "../ClassSlice"

const UpdateClass = () =>{
    const navigate = useNavigate()
    const {student_file, course_file, configure} = useSelector((state) => state.class)
    const [loading, setLoading] = useState(false)
    const [teacher, setTeacher] = useState([])
    const [student, setStudent] = useState([])
    const [statusImport, setStatusImport] = useState("notStarted")
    const dispatch = useDispatch()
    const params = useParams()
    
    const handleSubmit = async () => {
        setLoading(true)
        const data = new FormData
        data.append("student_file", student_file)
        data.append("course_file", course_file)
        data.append("data", JSON.stringify(configure))
        const response = await updateClassUtils(data, params.id)
        if (response.status_code == 200) {
            dispatch(resetClassState())
            navigate("/myclass/class")
        }
        setLoading(false)
    }

    const handleGetData = async () => {
        const response = await getDataByIdUtils(params.id)
        if (response.status_code == 200) {
            const data = response.data
            const config = {
                name: data.name,
                teacher_id: data.teacher_id,
                status: data.status,
                level: data.level,
                major: data.major 
            }
            dispatch(setConfigClass(config))
            if (data.imports.status != "") {
                setStatusImport(data.imports.status)
            }
            if (data.students.length > 0) {
                setStudent(data.students)
            }
        }
    }

    const getAllTeacher = async () => {
        const data = await getListAllTeacherUtils()
        if (data) {
            setTeacher(data)       
            handleGetData()
        }
    }

    useEffect(() => {
        getAllTeacher()
    },[])

    const Tab = [
        {label: "Config Class", content: (<ConfigureClass listTeacher={teacher} data={configure}/>)},
        {label: "Student", content: (<StudentClass status={statusImport}/>), disabled : false},
        {label: "Course", content: (<CourseClass />), disabled : false},
    ]

    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-6xl mx-auto my-6"
        >
            <PageStandart
                tittle={"Update Class"}
            >
                <Tabs tabs={Tab} />
                <Button onLoading={loading} onClick ={handleSubmit}>Update Class</Button>
            </PageStandart>
        </ContainerMution>
    )
}


export default UpdateClass