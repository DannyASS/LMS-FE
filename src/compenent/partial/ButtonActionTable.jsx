import { motion } from "framer-motion";
import Loading from "./Spinner";
const ButtonAction = ({onClick, onLoading = false, className='bg-black text-white', icon, text}) => {

    const children = () => {
        return(
            <>
                <div className="flex justify-center">
                    {icon}
                </div>

                <motion.p
                className="whitespace-nowrap"
                variants={{
                    default: { opacity: 0, x: 10 },
                    hover: { opacity: 1, x: 0 }
                }}
                transition={{ delay: 0.05 }}
                >
                    {text}
                </motion.p>
            </>
        )
    }
    return(
        <motion.button
            onClick={onClick}
            className={`rounded-xl flex items-center gap-2 px-3 py-2
                    ${className} hover: cursor-pointer`}
            initial="default"
            whileHover="hover"
            variants={{
            default: { width: 40 },      // kecil (hanya icon)
            hover: { width: 100 }        // melebar saat hover
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {onLoading? <Loading /> : children()}

        </motion.button>
    )
}

export default ButtonAction