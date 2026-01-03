import { Outlet, useOutlet } from "react-router-dom"
import { NavigateSetter } from "../../utils/router/navigationSetter"
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

const LayoutPage = () => {
    const getOutlet = useOutlet()
    const left = "ml-64"
    const top = "pt-16"
    const [currentObject, setCurrentObject] = useState(null)

    useEffect(()=> {
        if (getOutlet) {
            setCurrentObject(getOutlet.props.children.props.match.route)
        }
    },[getOutlet])

    return(
        <div className="min-h-screen bg-gray-50">
            {
                currentObject?.sidebar && <Sidebar />
            }
            {
                currentObject?.header && <Navbar />
            }
        <main className={currentObject?.sidebar == true ? left : '' +` ` + currentObject?.header == true ? top : ''}>
            <div className="p-6">
                <Outlet />
                <NavigateSetter />
            </div>
        </main>
        </div>
    )
}

export default LayoutPage;