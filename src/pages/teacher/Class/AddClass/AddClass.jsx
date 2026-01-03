import ContainerMution from "@/compenent/partial/ContainerCustom"
import PageStandart from "@/compenent/partial/PageStandart"
import Tabs from "@/compenent/partial/Tabs"
import ConfigureClass from "./component/ConfigureClass"
import StudentClass from "./component/StudentClass"
import CourseClass from "./component/CourseClass"
import Button from "@/compenent/partial/Button"
import { useDispatch, useSelector } from "react-redux"
import { createClassUtils } from "../Utils/utils_class"
import { setConfigClass } from "../ClassSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddClass = () =>{
    const {configure} = useSelector((state) => state.class)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setLoading(true)
        const data = await createClassUtils(configure)
        if (data.status_code == 200) {
            dispatch(setConfigClass(null))
            navigate("/myclass/class")
        }
        setLoading(false)
    }


    const Tab = [
        {label: "Config Class", content: (<ConfigureClass />)},
        {label: "Student", content: (<StudentClass />), disabled : true},
        {label: "Course", content: (<CourseClass />), disabled : true},
    ]

    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-6xl mx-auto my-6"
        >
            <PageStandart
                tittle={"Add Class"}
            >
                <Tabs tabs={Tab} />
                <Button onLoading={loading} onClick={handleSubmit}>Create Class</Button>
            </PageStandart>
        </ContainerMution>
    )
}


export default AddClass