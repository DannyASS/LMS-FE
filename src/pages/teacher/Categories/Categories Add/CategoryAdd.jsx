import ContainerMution from "@/compenent/partial/ContainerCustom"
import PageStandart from "@/compenent/partial/PageStandart"


const AddCategory = () => {
    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-6xl mx-auto my-6"
        >
            <PageStandart
                tittle={"Add Category"}
            >

            </PageStandart>
        </ContainerMution>
    )
}


export default AddCategory