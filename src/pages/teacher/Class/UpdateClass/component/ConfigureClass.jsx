import ContainerMution from "@/compenent/partial/ContainerCustom";
import Input from "@/compenent/partial/Input";
import Label from "@/compenent/partial/Labels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/compenent/partial/Select";
import { useEffect, useState } from "react";

const ConfigureClass = ({data, listTeacher}) => {
    const [config, setConfig] = useState(data)
    const [teachers, setTeachers] = useState([])

    const handleChange = (field, value) => {
        if (field === "teacher_id") {
            value = Number(value);
        }
        setConfig((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setTeachers(listTeacher)
    }, [listTeacher])

    useEffect(() => {
        setConfig(data)
    }, [data])

    return(
        <ContainerMution>
                <form className="space-y-8">
                    {/* class name */}
                    <div className="space-y-2">
                        <Label>Class Name</Label>
                        <Input
                            onChange = {(e) =>handleChange("name", e.target.value)}
                            value={config.name} 
                            placeholder="Example: Kelas 12 IPA III"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Level</Label>
                        <Input 
                            onChange = {(e) =>handleChange("level", e.target.value)}
                            value={config.level}
                            placeholder="Example: 10,11,12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Major</Label>
                        <Input 
                            onChange = {(e) =>handleChange("major", e.target.value)}
                            value={config.major}
                            placeholder="Example: IPA,IPS"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Class Advisor</Label>
                        <Select value={config.teacher_id} onValueChange={(e) =>handleChange("teacher_id", e)}>
                        <SelectTrigger  className="w-full h-auto py-3">
                            <SelectValue placeholder="Choose class advisor" />
                        </SelectTrigger>
                        <SelectContent>
                            {teachers.map((data) => (
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