import ContainerMution from "@/compenent/partial/ContainerCustom"
import ExcelUploader from "@/compenent/partial/ExcelUploader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/compenent/partial/Table"
import { useEffect, useState } from "react"
import { deleteStudentClassByIDClassUtils, deleteStudentClassByIDUtils, downloadTemplateStudentUtils, getStudentClassDataByIdUtils, ImportStatusUtils } from "../../Utils/utils_class"
import { useDispatch, useSelector } from "react-redux"
import { setFileStudent } from "../../ClassSlice"
import ButtonAction from "@/compenent/partial/ButtonActionTable"
import { Trash2 } from "lucide-react"
import ServerPagination from "@/compenent/partial/TablePagination"
import Button from "@/compenent/partial/Button"
import { useParams } from "react-router-dom"

const StudentClass = ({status = null, students=[]}) => {
    const [statusUpload, setStatusUpload] = useState(status)
    const [student, setStudent] = useState([])
    const [page, setPage] = useState(1)
    const [perPage] = useState(10);
    const [total, setTotal] = useState(1);
    const [studentDummy, setStudentDummy] = useState([])
    const {file} = useSelector((state) => state.class)
    const dispatch = useDispatch()
    const params = useParams()
    const [importStatus, setImportStatus] = useState({
        status: "notStarted"
    })
    const colors = {
        progress: "text-orange-600",
        success: "text-green-600",
        failed: "text-red-600",
        notStarted: "text-gray-600",
    };
    const [loading, setLoading] = useState({
        all: false,
        id: false
    })

    const handleDownload = async() => {
        const data = await downloadTemplateStudentUtils()
    }

    const handleUpload = (file) => {
        dispatch(setFileStudent(file))
    }

    const handleRemoveFile = () => {
        dispatch(setFileStudent(null))
    }

    const handlePage = () => {
        var start = (page - 1) * perPage
        var finisih = (page * perPage) - 1
        const dataShow = student.slice(start, finisih)
        setStudentDummy(dataShow)
    }

    const handleDeleteStudentById = async(id) => {
        setLoading({...loading, id: true})
        const response = await deleteStudentClassByIDUtils(id)
        if (response.status_code == 200) {
            handleGetDataStudent()
        }
        setLoading({...loading, id: false})
    }

    const handleDeleteAllStudent = async() => {
        setLoading({...loading, all: true})
        const response = await deleteStudentClassByIDClassUtils(params.id)
        if (response.status_code == 200) {
            handleGetDataStudent()
        }
        setLoading({...loading, all: false})
    }

    const handleGetDataStudent = async() => {
        console.log("params class student :", params)
        const response = await getStudentClassDataByIdUtils(params.id)
        setStudent(response)
    }

    useEffect(() => {
        if (student.length > 0) {
            setTotal(student.length)
            setStudentDummy(student.slice(0, perPage-1))
        } else {
            setTotal(student.length)
            setStudentDummy([])
        }
    }, [student])

    const handleImportStatus = async() => {
        const paramsdata = {
            type: "student class",
            id: params.id
        } 
        const response = await ImportStatusUtils(paramsdata)
        setImportStatus(response)
    }

    useEffect(() => {
        handleGetDataStudent()
        handleImportStatus()
    }, [])

    useEffect(() => {
        handlePage()
    }, [page, total])

    return(
        <ContainerMution>
            <ExcelUploader onUpload={handleUpload} onRemoveFile={handleRemoveFile} value={file}/>
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
                <p className="text-gray-600 text-sm">Status Upload: <span className={`${colors[importStatus.status]} text-sm`}>{importStatus.status == "notStarted" ? "-" : statusUpload}</span></p>
            </div>
            <div className="my-5 text-right">
                    <Button onLoading={loading.all} onClick={handleDeleteAllStudent} className="bg-red-400">
                        Delete All Student
                    </Button>
            </div>
            <div className="my-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Gander</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentDummy.map((data) => (
                            <TableRow>
                                <TableCell>{data.user_id}</TableCell>
                                <TableCell>{data.student_name}</TableCell>
                                <TableCell>{data.gender}</TableCell>
                                <TableCell className="text-right flex justify-end gap-3">
                                    <ButtonAction onLoading={loading.id} text={"Delete"} onClick={() => handleDeleteStudentById(data.id)} icon={<Trash2 size={18} />} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ServerPagination 
                    page={page}
                    perPage={perPage}
                    total={total}
                    onPageChange={setPage}
                />
            </div>
        </ContainerMution>
    )
}

export default StudentClass