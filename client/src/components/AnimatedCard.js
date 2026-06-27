import { motion } from "framer-motion";

export default function AnimatedCard({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            style={{
                background: "white",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
            }}
        >
            {children}
        </motion.div>
    );
}