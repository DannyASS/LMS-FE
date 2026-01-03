import { useState } from "react";
import Button from "../../../../compenent/partial/Button";
import Input from "../../../../compenent/partial/Input";
import Label from "../../../../compenent/partial/Labels";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../compenent/partial/Select";
import ContainerMution from "@/compenent/partial/ContainerCustom";
import PageStandart from "@/compenent/partial/PageStandart";
import { createCourseUtils } from "../Utils/CourseUtils";
import { useNavigate } from "react-router-dom";
import Loading from "@/compenent/partial/Spinner";

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: null
  });

  const handleChange = (field, value) => {
    if (field == "category_id") {
      value = Number(value)
      console.log("masuk sini?")
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await createCourseUtils(form)
      if (response.status_code == 200) {
        navigate(-1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
    console.log("Submit data:", form);
  };

  return (
    <ContainerMution
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 w-full mx-auto my-6"
    >
      <PageStandart tittle={"Add New Course"}>
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

              {/* Category */}
              <div className="space-y-2">
                <Label>Kategori Kelas</Label>
                <Select value={form.category_id} onValueChange={(value) => handleChange("category_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={3}>Kelas 10</SelectItem>
                    <SelectItem value={2}>Kelas 11</SelectItem>
                    <SelectItem value={1}>Kelas 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full py-3 text-lg font-semibold">
                {loading ?  <Loading /> : "Create Course"}
              </Button>

        </form>
      </PageStandart>
    </ContainerMution>
  );
};

export default AddCourse;
