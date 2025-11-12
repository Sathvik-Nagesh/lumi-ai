import React from 'react';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react';

interface WelcomeScreenProps {
  appName: string;
  welcomeMessage: string;
  tagline: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  appName,
  welcomeMessage,
  tagline,
}) => {
  const features = [
    { icon: Sparkles, text: 'AI-Powered Responses' },
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Shield, text: 'Secure & Private' },
    { icon: Rocket, text: 'Advanced Features' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full px-8 py-12"
    >
      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 dark:opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
            {import.meta.env.VITE_APP_LOGO_TEXT || 'L'}
          </div>
        </div>
      </motion.div>

      {/* App Name with Shimmer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <TextShimmer
          duration={2.5}
          className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400"
          as="h1"
        >
          {appName}
        </TextShimmer>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-3 max-w-lg text-center"
      >
        <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
          {welcomeMessage}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-12 max-w-md text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tagline}
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-all hover:border-purple-500 dark:hover:border-purple-400"
          >
            <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-center text-gray-600 dark:text-gray-400">
              {feature.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12"
      >
        <p className="text-sm text-gray-400 dark:text-gray-500 animate-pulse">
          Type a message to get started...
        </p>
      </motion.div>
    </motion.div>
  );
};
