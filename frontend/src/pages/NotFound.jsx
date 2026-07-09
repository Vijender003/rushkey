import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-4 text-8xl font-extrabold text-rushkey-500"
      >
        404
      </motion.h1>
      <p className="mb-8 text-xl text-gray-500">Page not found</p>
      <Link
        to="/"
        className="rounded-lg bg-rushkey-500 px-8 py-3 font-semibold text-white transition hover:bg-rushkey-600"
      >
        Go Home
      </Link>
    </motion.div>
  );
}
