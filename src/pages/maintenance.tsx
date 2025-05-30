
import Typography from '@/components/Typography/Typography';
import { motion } from 'framer-motion';
import { FaCog } from 'react-icons/fa';
import { IoCogOutline } from 'react-icons/io5';

const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
    }
};
export default function Maintenance() {
    return (
        <div className="h-full w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-red-700">
            <motion.section
                animate={{ opacity: 10, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center p-3"
            >
                <div className='flex flex-row items-center justify-center gap-5'>
                    <FaCog
                        className="text-8xl animate-spin-supreme  transition-transform hover:scale-110"
                        aria-label="Supreme loading icon"
                    />
                    <div className='flex flex-col items-center justify-center'>
                        <motion.div
                            animate={floatingAnimation}
                            className="inline-block"
                        >
                            <Typography
                                type='Header'
                                size='6xl'
                                className="text-center text-transparent bg-gradient-to-r from-white via-gray-200 to-red-400 font-bold bg-clip-text"
                            >
                                Maintenance Mode
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                            className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-4"
                        />
                        <motion.p
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg mt-3 font-light text-gray-300 text-center max-w-lg mx-auto"
                        >
                            Our site is currently undergoing maintenance. We apologize for the inconvenience and appreciate your patience.
                        </motion.p>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}