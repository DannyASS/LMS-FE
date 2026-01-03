import { motion } from "framer-motion";
const ContainerMution = ({
    className ="", id ="", 
    initial={ opacity: 0, y: 20 }, 
    animate={ opacity: 1, y: 0 },
    transition,
    children}) =>{
    return(
    <motion.div 
    className={className} 
    id={id} 
    initial={initial} 
    animate={animate}
    transition={transition}>
        {children}
    </motion.div>)
}


export default ContainerMution