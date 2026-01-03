import { useEffect, useState } from "react";
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
import { createModuleUtils, getCourseModuleUtils } from "../Utils/ModuleUtils";
import { useNavigate } from "react-router-dom";
import Loading from "@/compenent/partial/Spinner";
import { data } from "autoprefixer";

const AddModule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [course,setCourse] = useState([])

  const [form, setForm] = useState({
    title: "",
    course_id: null,
    type: "",
    order_index: 0
  });

  const handleChange = (field, value) => {
    if (field === "course_id" || field === "order_index") {
      value = Number(value);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createModuleUtils(form);
      if (response?.status_code === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCourse = async () => {
      const data = await getCourseModuleUtils()
      if (data.length > 0) {
        setCourse(data)
      }
  }

  useEffect(() => {
    getCourse()
  },[])

  return (
    <ContainerMution
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 w-full mx-auto my-6"
    >
      <PageStandart tittle={"Add New Module"}>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Module Title</Label>
            <Input
              placeholder="Enter module title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* COURSE ID */}
          <div className="space-y-2">
            <Label>Course</Label>
            <Select 
              value={form.course_id} 
              onValueChange={(value) => handleChange("course_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Course" />
              </SelectTrigger>

              <SelectContent>
                {/* Dummy course – nanti ganti dari API */}
                {course.map((data) => (
                  <SelectItem value={data.course_id}>{data.course_title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <Label>Module Type</Label>
            <Select 
              value={form.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="article">Article</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ORDER INDEX */}
          <div className="space-y-2">
            <Label>Order Index</Label>
            <Input
              placeholder="Example: 1"
              type="number"
              value={form.order_index}
              onChange={(e) => handleChange("order_index", e.target.value)}
            />
          </div>

          {/* SUBMIT */}
          <Button type="submit" className="w-full py-3 text-lg font-semibold">
            {loading ? <Loading /> : "Create Module"}
          </Button>

        </form>
      </PageStandart>
    </ContainerMution>
  );
};

export default AddModule;
