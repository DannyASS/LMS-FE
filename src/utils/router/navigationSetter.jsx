import { useNavigate } from "react-router-dom"
import { History } from "./objectRouter"



export const NavigateSetter = () => {
    History.navigate = useNavigate();

    return null;
}