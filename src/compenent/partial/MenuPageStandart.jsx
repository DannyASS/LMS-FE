import { Plus } from "lucide-react"
import Button from "./Button"
import Card, { CardContent } from "./Card"

const MenuPageStandart = ({tittle, children, onAdd}) => {
    return(
        <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{tittle}</h1>
                    <Button onClick={onAdd} className="rounded-xl flex gap-2">
                        <Plus size={18} /> Add {tittle}
                    </Button>
                </div>

                {children}
            </CardContent>        
        </Card>
    )
}


export default MenuPageStandart