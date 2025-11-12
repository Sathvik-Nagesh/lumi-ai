import React from 'react';
import { X, Trash2, Download, AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatManagement } from '@/contexts/ChatManagementContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { deleteAllChats, exportAllChats, chats } = useChatManagement();

  const handleDeleteAllChats = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL chats? This action cannot be undone.')) {
      deleteAllChats();
      onClose();
    }
  };

  const handleExportAllChats = () => {
    exportAllChats();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Chat Management Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Chat Management</h3>
                <div className="space-y-3">
                  {/* Export All Chats */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Export All Chats</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Download all your conversations as JSON ({chats.length} chats)
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleExportAllChats}
                      disabled={chats.length === 0}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Export
                    </Button>
                  </div>

                  {/* Delete All Chats */}
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Delete All Chats</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Permanently remove all conversations
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleDeleteAllChats}
                      disabled={chats.length === 0}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                  </div>
                </div>
              </div>

              {/* App Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About</h3>
                <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">App:</span> {import.meta.env.VITE_APP_NAME || 'Lumi AI'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Version:</span> 1.0.0
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">API:</span> {import.meta.env.VITE_USE_REAL_API === 'true' ? 'Gemini Pro' : 'Demo Mode'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Total Chats:</span> {chats.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-zinc-800">
              <Button
                onClick={onClose}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
