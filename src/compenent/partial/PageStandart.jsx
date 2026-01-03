import { useNavigate } from "react-router-dom"
import Card, { CardContent } from "./Card"
import Button from "./Button"



const PageStandart = ({tittle, children, className}) => {
  const navigate = useNavigate()
    return(
        <div className="max-w-3xl mx-auto relative">

        {/* 🔙 Tombol Back */}

        <Card className={"w-full shadow-lg rounded-2xl mt-8" + className}>
            <Button
                onClick={() => navigate(-1)}
                className="absolute right-5 bg-black text-white px-3 py-1.5 rounded-full shadow hover:bg-gray-800 transition"
            >
                X
            </Button>
          <CardContent className="p-8 space-y-8">

            <h2 className="text-3xl font-bold text-center">{tittle}</h2>

            {children}
          </CardContent>
        </Card>
      </div>
    )
}

export default PageStandart