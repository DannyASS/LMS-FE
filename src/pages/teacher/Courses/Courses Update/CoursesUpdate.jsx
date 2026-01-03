import Button from "@/compenent/partial/Button";
import ContainerMution from "@/compenent/partial/ContainerCustom";
import Input from "@/compenent/partial/Input";
import Label from "@/compenent/partial/Labels";
import PageStandart from "@/compenent/partial/PageStandart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/compenent/partial/Select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetCourseUtils, updateCourseUtils } from "../Utils/CourseUtils";
import Loading from "@/compenent/partial/Spinner";



const UpdateCourse = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: "",
        description: "",
        category_id: "",
        status: "draft",
        thumbnail_url: "",
      });


    const handleSubmit = async (e) =>{
        e.preventDefault();
         setLoading(true)
    try {
        const response = await updateCourseUtils(id,form)
        if (response.status_code == 200) {
            navigate(-1)
        }
        } catch (error) {
              console.error(error)
        } finally {
             setLoading(false)
        }
        console.log("update data:", form);
    }

    const handleChange = (field, value) => {
    if (field == "category_id") {
      value = Number(value)
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetData = async() => {
    try {
        const data = await GetCourseUtils(id)
        const course = data?.data
        if (course) {
            const newForm = {
                title : course.title,
                description :course.description,
                category_id : Number(course.category_id),
                status: course.status
            }
            setForm(newForm)
        }
    } catch (error) {
        
    }
  }

  useEffect(() => {
    handleGetData()
  },[])


    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 w-full"
        >
            <PageStandart tittle={"Update Course"}>
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Title */}
                    <div className="space-y-2">
                        <Label>Course Title</Label>
                        <Input
                            placeholder="Enter course title"
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            placeholder="Enter course description"
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                    {/* Thumbnail URL */}
                    <div className="space-y-2">
                        <Label>Thumbnail Url</Label>
                        <Input
                            placeholder="Enter your thumbnail url"
                            value={form.thumbnail_url}
                            onChange={(e) => handleChange("thumbnail_url", e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label>Kategori Kelas</Label>
                        <Select
                        value={String(form.category_id)}
                        onValueChange={(value) => handleChange("category_id", Number(value))}
                        >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose level" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="3">Kelas 10</SelectItem>
                            <SelectItem value="2">Kelas 11</SelectItem>
                            <SelectItem value="1">Kelas 12</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={form.status} onValueChange={(value) => handleChange("status", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="published">Publish</SelectItem>
                                <SelectItem value="archived">Archive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full py-3 text-lg font-semibold">
                         {loading ?  <Loading /> : "Update Course"}
                    </Button>

                </form>
            </PageStandart>
        </ContainerMution>
    )
}

export default UpdateCourse;