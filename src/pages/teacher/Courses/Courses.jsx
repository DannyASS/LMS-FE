import { useEffect, useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/compenent/partial/Table";
import { Pencil, Trash2 } from "lucide-react";
import ContainerMution from "@/compenent/partial/ContainerCustom";
import { useNavigate } from "react-router-dom";
import MenuPageStandart from "@/compenent/partial/MenuPageStandart";
import ButtonAction from "@/compenent/partial/ButtonActionTable";
import { GetCourseUtils, GetListCorseUtils } from "./Utils/CourseUtils";
import ServerPagination from "@/compenent/partial/TablePagination";
import Input from "@/compenent/partial/Input";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleGetListCourse = async () => {
    const params = {
      search : debouncedSearch,
      page: page,
      perpage: perPage,
      sort_by: "id",
      sort_type: "asc",
    }
    const data = await GetListCorseUtils(params)
    if (data?.data) {
      setCourses(data?.data)
    }
    setPage(data?.page)
    setTotal(data?.total_data)
  }

  // dummy fetch
  useEffect(() => {
    // setCourses([
    //   {
    //     id: 1,
    //     title: "Math Homework 1",
    //     level: "homework",
    //     status: "published",
    //   },
    //   {
    //     id: 2,
    //     title: "English Pre Test",
    //     level: "pre_test",
    //     status: "draft",
    //   },
    //   {
    //     id: 3,
    //     title: "Science Exam",
    //     level: "exam",
    //     status: "archived",
    //   },
    // ]);
  
    handleGetListCourse()
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [search]);

  // fetch data setiap debouncedSearch berubah
  useEffect(() => {
    handleGetListCourse();
  }, [debouncedSearch]);

   useEffect(() => {
    handleGetListCourse();
  }, [page]); 

  return (
    <ContainerMution
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto my-6"
    >
      <MenuPageStandart
        tittle={"Course"}
        onAdd={() => navigate('/mycourse/courses/create')}
      >
        <Input 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3 w-3"
        />
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="capitalize">{c.status}</TableCell>

                  <TableCell className="text-right flex justify-end gap-3">
                    <ButtonAction 
                        text={"Update"} 
                        icon={<Pencil size={18} />} 
                        className="bg-black text-white hover:bg-grey-800 transition cursor-pointer" 
                        onClick={() => navigate(`/mycourse/courses/update/${c.id}`)} 
                    />
                    <ButtonAction text={"Delete"} icon={<Trash2 size={18} />} />
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
      </MenuPageStandart>
    </ContainerMution>
  );
}


export default CoursesPage