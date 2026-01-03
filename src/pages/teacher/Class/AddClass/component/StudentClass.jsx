import ContainerMution from "@/compenent/partial/ContainerCustom"
import ExcelUploader from "@/compenent/partial/ExcelUploader"
import { Table, TableHead, TableHeader, TableRow } from "@/compenent/partial/Table"
import { useState } from "react"

const StudentClass = () => {
    const [statusUpload, setStatusUpload] = useState("not started")
    return(
        <ContainerMution>
            <ExcelUploader />
            <div className="my-5">
                <p className="text-gray-600 text-sm">Status Upload: {statusUpload}</p>
            </div>
            <div className="my-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
        </ContainerMution>
    )
}

export default StudentClass