import ContainerMution from "@/compenent/partial/ContainerCustom"
import MenuPageStandart from "@/compenent/partial/MenuPageStandart"

const Categories = () => {
    return(
        <ContainerMution
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-6xl mx-auto my-6"
        >
            <MenuPageStandart
                tittle={"Categories"}
            >

            </MenuPageStandart>
        </ContainerMution>
    )
}


export default Categories