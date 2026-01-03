import Button from "@/compenent/partial/Button";
import ContainerMution from "@/compenent/partial/ContainerCustom";
import Input from "@/compenent/partial/Input";
import Label from "@/compenent/partial/Labels";
import PageStandart from "@/compenent/partial/PageStandart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/compenent/partial/Select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/compenent/partial/Spinner";
import { getCourseModuleUtils, GetModuleUtils, updateModuleUtils } from "../Utils/ModuleUtils";

const UpdateModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([])

  const [form, setForm] = useState({
    title: "",
    type: "",
    order_index: 1,
    course_id: "",
  });

  const handleChange = (field, value) => {
    if (field === "order_index" || field === "course_id") {
      value = Number(value);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getCourse = async () => {
      const data = await getCourseModuleUtils()
      if (data.length > 0) {
        setCourse(data)    
        handleGetData();
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateModuleUtils(id, form);
      if (res.status_code === 200) {
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetData = async () => {
    try {
      const response = await GetModuleUtils(id);
      const moduleData = response?.data;

      if (moduleData) {
        const newForm = {
          title: moduleData.title,
          type: moduleData.type,
          order_index: moduleData.order_index,
          course_id: Number(moduleData.course_id),
        };
        setForm(newForm);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourse()
  }, []);

  return (
    <ContainerMution
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 w-full my-6"
    >
      <PageStandart tittle={"Update Module"}>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div className="space-y-2">
            <Label>Module Title</Label>
            <Input
              placeholder="Enter module title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={form.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order Index */}
          <div className="space-y-2">
            <Label>Order Index</Label>
            <Input
              type="number"
              placeholder="Order index"
              value={form.order_index}
              onChange={(e) => handleChange("order_index", e.target.value)}
            />
          </div>

          {/* Course ID */}
          <div className="space-y-2">
            <Label>Course</Label>
            <Select
              value={form.course_id}
              onValueChange={(val) => handleChange("course_id", Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose course" />
              </SelectTrigger>
              <SelectContent>
                {course.map((data) => (
                    <SelectItem value={data.course_id}>{data.course_title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full py-3 text-lg font-semibold">
            {loading ? <Loading /> : "Update Module"}
          </Button>

        </form>
      </PageStandart>
    </ContainerMution>
  );
};

export default UpdateModule;
