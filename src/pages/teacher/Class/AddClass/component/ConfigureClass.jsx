import ContainerMution from "@/compenent/partial/ContainerCustom";
import Input from "@/compenent/partial/Input";
import Label from "@/compenent/partial/Labels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/compenent/partial/Select";
import { useEffect, useState } from "react";
import { getListAllTeacherUtils } from "../../Utils/utils_class";
import { useDispatch } from "react-redux";
import { setConfigClass } from "../../ClassSlice";

const ConfigureClass = () => {
    const [teacher,setTeacher] = useState([])
    const dispatch = useDispatch()
    const [formJson, setForm] = useState({
        name: "",
        teacher_id: "",
        status: null,
        level: null,
        major: "",
    })

    useEffect(() => {
        dispatch(setConfigClass(formJson))
    },[formJson])

    const handleChange = (field, value) => {
        if (field === "teacher_id") {
            value = Number(value);
        }
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    
    const getAllTeacher = async () => {
        const data = await getListAllTeacherUtils()
        if (data) {
            setTeacher(data)
        }
    } 

    
    useEffect(() => {
        getAllTeacher()
    },[])


    return(
        <ContainerMution>
                <form className="space-y-8">
                    {/* class name */}
                    <div className="space-y-2">
                        <Label>Class Name</Label>
                        <Input 
                            value={formJson.name}
                            onChange ={(e) => handleChange("name", e.target.value)}
                            placeholder="Example: Kelas 12 IPA III"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Level</Label>
                        <Input 
                            value={formJson.level}
                            onChange ={(e) => handleChange("level", e.target.value)}
                            placeholder="Example: 10,11,12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Major</Label>
                        <Input 
                            onChange ={(e) => handleChange("major", e.target.value)}
                            value={formJson.major}
                            placeholder="Example: IPA,IPS"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Class Advisor</Label>
                        <Select value={formJson.teacher_id} onValueChange={(value) => handleChange("teacher_id", value)}>
                        <SelectTrigger  className="w-full h-auto py-3">
                            <SelectValue placeholder="Choose class advisor" />
                        </SelectTrigger>
                        <SelectContent>
                            {teacher.map((data) => (
                                <SelectItem value={data?.teacher_id}>{data?.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                </form>
        </ContainerMution>
    )
}

export default ConfigureClass;