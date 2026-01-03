import { RouterProvider } from "react-router-dom"
import { router } from "./utils/router/objectRouter"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
   <div>
    {/* <AuthProvider> */}
      <RouterProvider router={router} />
    {/* </AuthProvider> */}
   </div> 
  )
}

export default App
