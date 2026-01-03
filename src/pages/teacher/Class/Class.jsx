import ContainerMution from "@/compenent/partial/ContainerCustom";
import MenuPageStandart from "@/compenent/partial/MenuPageStandart";
import CardKelas from "./compenent/CardKelas";
import { useEffect, useState } from "react";
import { getListClassesUtils } from "./Utils/utils_class";
import { useNavigate } from "react-router-dom";
import { objectRouter } from "@/utils/router/objectRouter";

export function Class() {
  const [list, setList] = useState([])
  const Router = objectRouter
  const [params, setParams] = useState({
    page: 1,
    perpage: 10,
    search : ""
  })
  const navigate = useNavigate()

  const getClass = async() => {
    const data = await getListClassesUtils(params)
    if (data?.data) {
      setList(data?.data)  
    }
  }

  useEffect(() => {
    getClass()
  },[])
  return (
      <ContainerMution
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-6xl mx-auto my-6"
      >
        <MenuPageStandart
          tittle={"Class"}
          onAdd={() => navigate("/myclass/class/create")}
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((data) => (
                  <CardKelas
                    key={data?.id}
                    onUpdate={() => navigate(`/myclass/class/update/${data?.id}`)} 
                    nama={data?.name}
                    jumlahSiswa={data?.total_student}
                    progress={data?.progress}
                    onOpen={() => navigate(Router.dashboardClass.path.replace(":id",data?.id))}
                  />
                ))}
          </div>

        </MenuPageStandart>
      </ContainerMution>
  );
}
