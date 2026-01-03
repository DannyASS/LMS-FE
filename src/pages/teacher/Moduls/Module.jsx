// ModulesPage.jsx
import { useEffect, useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/compenent/partial/Table";
import { Pencil, Trash2 } from "lucide-react";
import ContainerMution from "@/compenent/partial/ContainerCustom";
import { useNavigate } from "react-router-dom";
import MenuPageStandart from "@/compenent/partial/MenuPageStandart";
import ButtonAction from "@/compenent/partial/ButtonActionTable";
import { GetListModuleUtils } from "./utils/ModuleUtils";
import ServerPagination from "@/compenent/partial/TablePagination";
import Input from "@/compenent/partial/Input";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleGetListModule = async () => {
    const params = {
      search : debouncedSearch,
      page: page,
      perpage: perPage,
      sort_by: "id",
      sort_type: "asc",
    }

    const data = await GetListModuleUtils(params)

    if (data?.data) {
      setModules(data?.data)
    }

    setPage(data?.page)
    setTotal(data?.total_data)
  }

  useEffect(() => {
    handleGetListModule()
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    handleGetListModule()
  }, [debouncedSearch]);

  useEffect(() => {
    handleGetListModule();
  }, [page]);

  return (
    <ContainerMution
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto my-6"
    >
      <MenuPageStandart
        tittle={"Modules"}
        onAdd={() => navigate('/mycourse/modules/create')}
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
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {modules.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.title}</TableCell>
                <TableCell className="font-medium">{m.type}</TableCell>
                <TableCell className="text-right flex justify-end gap-3">
                  <ButtonAction 
                    text={"Update"} 
                    icon={<Pencil size={18} />} 
                    className="bg-black text-white hover:bg-grey-800 transition cursor-pointer" 
                    onClick={() => navigate(`/mycourse/modules/update/${m.id}`)} 
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
};

export default ModulesPage;
