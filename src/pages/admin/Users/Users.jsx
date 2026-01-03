import ContainerMution from "@/compenent/partial/ContainerCustom"
import MenuPageStandart from "@/compenent/partial/MenuPageStandart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/compenent/partial/Table"
import { useEffect, useState } from "react"
import { getListUserUtils } from "./Utils/userUtils"
import ButtonAction from "@/compenent/partial/ButtonActionTable"
import { Pencil, Trash2 } from "lucide-react"
import ServerPagination from "@/compenent/partial/TablePagination"

const UserPage = () =>  {
    const [user,setUser] = useState([])
    const [param, setParams] = useState({
        page: 1,
        perpage: 10,
        total_data: 10,
        total_page: 1
    })
    const[change, setChange] = useState(param.page)


    const handleUsers = async() => {
        try {
            const data = await getListUserUtils(param)
            if (data?.data) {
                setUser(data?.data)
                setParams({
                    ...param,
                    total_data: data?.total_data,
                    total_page: data?.total_page
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        handleUsers()
    },[])

    useEffect(() => {
        var params = param
        params.page = change
        setParams(params)
        handleUsers()
    },[change])


    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-6xl mx-auto my-6"
        >
            <MenuPageStandart tittle={"Users"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.map((c) => (
                            <TableRow>
                                <TableCell>{c?.name}</TableCell>
                                <TableCell>{c?.username}</TableCell>
                                <TableCell>{c?.email}</TableCell>
                                <TableCell>{c?.phone}</TableCell>
                                <TableCell>{c?.role_name}</TableCell>
                                <TableCell className="text-right flex justify-end gap-3">
                                    <ButtonAction text={"Update"} icon={<Pencil size={18} />} className="bg-black text-white hover:bg-grey-800 transition cursor-pointer" onClick={() => navigate(`/courses/update/${c.id}`)} />
                                    <ButtonAction text={"Delete"} icon={<Trash2 size={18} />} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ServerPagination
                page={param.page}
                perPage={param.perpage}
                total={param.total_data}
                onPageChange={setChange}
                />
            </MenuPageStandart>
        </ContainerMution>
    )
}

export default UserPage