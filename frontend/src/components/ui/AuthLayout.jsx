import { motion } from 'framer-motion';
import { HiShieldCheck, HiLockClosed } from 'react-icons/hi';

function FloatingCard({ className, delay, children }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function RotatingShape({ className }) {
  return (
    <motion.div
      className={`absolute border border-white/10 rounded-none ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #FF5A1F 0%, #7C3AED 50%, #0EA5E9 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 15s ease infinite',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rushkey-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/15 blur-[100px]" />

        <FloatingCard className="top-[15%] right-[10%] w-64" delay={0.2}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
            <div className="h-32 rounded-xl bg-gradient-to-br from-rushkey-400 to-rushkey-600 mb-3" />
            <div className="h-3 w-3/4 rounded-full bg-white/20 mb-2" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-4 w-16 rounded-full bg-white/20" />
              <div className="h-6 w-20 rounded-full bg-rushkey-500/50" />
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="bottom-[20%] left-[8%] w-56" delay={0.6}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
            <div className="h-28 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 mb-3" />
            <div className="h-3 w-2/3 rounded-full bg-white/20 mb-2" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
          </div>
        </FloatingCard>

        <FloatingCard className="top-[40%] right-[5%] w-48" delay={0.4}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
            <div className="h-24 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 mb-3" />
            <div className="h-3 w-1/2 rounded-full bg-white/20 mb-2" />
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
          </div>
        </FloatingCard>

        <RotatingShape className="top-[25%] left-[15%] w-16 h-16" />

        <div className="relative z-10 flex flex-col justify-end pb-20 px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Your Next Stay
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rushkey-400 to-rushkey-300">
                Starts Here
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              Find verified PGs in seconds with Rushkey
            </p>

            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiShieldCheck className="w-4 h-4 text-rushkey-400" />
                Secure & Encrypted
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiLockClosed className="w-4 h-4 text-rushkey-400" />
                No Spam Guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-8">
        <motion.div
          className="w-full max-w-[440px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-rushkey-500">Rushkey</h2>
            <p className="text-gray-400 text-sm mt-1">Find your perfect stay</p>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/60 p-8 sm:p-10">
            {children}
          </div>

          <div className="lg:hidden flex items-center justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <HiShieldCheck className="w-3.5 h-3.5" />
              Secure & Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <HiLockClosed className="w-3.5 h-3.5" />
              No Spam
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
