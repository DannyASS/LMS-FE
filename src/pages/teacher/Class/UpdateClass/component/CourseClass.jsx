import ContainerMution from "@/compenent/partial/ContainerCustom"
import ExcelUploader from "@/compenent/partial/ExcelUploader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/compenent/partial/Table"
import { useEffect, useState } from "react"
import { downloadTemplateCourseUtils, getCourseClassDataByIdUtils } from "../../Utils/utils_class"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setFileCourse } from "../../ClassSlice"
import { data } from "autoprefixer"
import ButtonAction from "@/compenent/partial/ButtonActionTable"
import { Trash2 } from "lucide-react"

const CourseClass = () =>{
     const [statusUpload, setStatusUpload] = useState("failed")
     const [courses, setCourses] = useState([])
     const dispatch = useDispatch()
     const param = useParams()
     const colors = {
        progress: "text-orange-600",
        done: "text-green-600",
        pending: "text-gray-600",
        failed: "text-red-600",
    };

    const handleDownload = async() => {
        const response = await downloadTemplateCourseUtils()
    }

    const getDataCourse = async() => {
        const response = await getCourseClassDataByIdUtils(param.id)
        if (response) {
            setCourses(response)
        }
    }

    const handleUpload = (file) => {
            dispatch(setFileCourse(file))
    }

    useEffect(() =>{
        getDataCourse()
    }, [])
    
    return(
        <ContainerMution>
            <ExcelUploader onUpload={handleUpload}/>
            <div className="my-5">
                <a href="#"
                    className="text-gray-600 text-sm"
                    onClick={(e) => {
                        e.preventDefault(); // cegah reload halaman
                        handleDownload();   // panggil fungsi download
                    }}
                >
                    Download Template
                </a>
                <p className="text-gray-600 text-sm">Status Upload: <span className={`${colors[statusUpload]} text-sm`}>{statusUpload}</span></p>
            </div>
            <div className="my-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            courses.map((data) => (
                                <TableRow>
                                    <TableCell>{data.title}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell className="text-right flex justify-end gap-3">
                                        <ButtonAction  text={"Delete"} icon={<Trash2 size={18} />} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </ContainerMution>
    )
}


export default CourseClass