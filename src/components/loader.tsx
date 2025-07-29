import { motion } from "framer-motion";

export const ImageLoader = () => (
    <div className="flex justify-center items-center h-full">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="w-2 h-2 mx-1 rounded-full bg-black"
                animate={{
                    y: ["0%", "-70%", "0%"],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                }}
            />
        ))}
    </div>
);
