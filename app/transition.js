import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => (
    <>
      <motion.div 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        exit={{opacity:0}} 
        transition={{duration:2, ease: [0.22,1,0.36,1]}}
      >
      <OgComponent />
      </motion.div>
    </>
  );
};

export default transition;
