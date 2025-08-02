// components/Dashboard/ProfileEditModal.tsx
"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  UserIcon, 
  CameraIcon,
  CheckIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import { useDashboard } from "./DashboardContext";
import Image from "next/image";

interface ProfileEditModalProps {
  onClose: () => void;
}

export default function ProfileEditModal({ onClose }: ProfileEditModalProps) {
  const { state, dispatch } = useDashboard();
  const [name, setName] = useState(state.user.name);
  const [profileImage, setProfileImage] = useState<string | null>(state.user.profileImage || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setError('');
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile in context
      dispatch({
        type: 'UPDATE_USER_PROFILE',
        payload: {
          name: name.trim(),
          profileImage: profileImage
        }
      });
      
      onClose();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.log(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges = name.trim() !== state.user.name || profileImage !== (state.user.profileImage || null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-neutral-200/20 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100/30 to-transparent rounded-full blur-xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-xl transition-colors z-10"
          >
            <XMarkIcon className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <UserIcon className="w-8 h-8 text-white" />
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 animate-ping opacity-10"></div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Edit Profile
            </motion.h2>
            
            <motion.p 
              className="text-neutral-600 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Update your profile information and photo
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 border-4 border-white shadow-lg">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Camera Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
                >
                  <CameraIcon className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Image Controls */}
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-primary-50"
                >
                  <PhotoIcon className="w-4 h-4" />
                  Change Photo
                </button>
                
                {profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-sm text-red-500 hover:text-red-600 transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-red-50"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </motion.div>

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Enter your display name"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-primary-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-primary-200"
                maxLength={50}
              />
              <div className="mt-1 text-xs text-neutral-500">
                {name.length}/50 characters
              </div>
            </motion.div>

            {/* Wallet Address (Read-only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Wallet Address
              </label>
              <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 font-mono text-sm">
                {state.walletAddress.slice(0, 10)}...{state.walletAddress.slice(-8)}
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                Wallet address cannot be changed
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="bg-red-50 border border-red-200 text-red-600 text-sm text-center py-3 px-4 rounded-xl"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-neutral-600 hover:text-neutral-700 transition-all duration-300 font-medium rounded-xl hover:bg-neutral-50 border border-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={!hasChanges || isSubmitting || name.trim().length < 2}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform relative overflow-hidden ${
                  hasChanges && !isSubmitting && name.trim().length >= 2
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={hasChanges && !isSubmitting && name.trim().length >= 2 ? { scale: 1.01 } : {}}
                whileTap={hasChanges && !isSubmitting && name.trim().length >= 2 ? { scale: 0.99 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CheckIcon className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </motion.button>
            </div>
          </form>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-6 text-center relative z-10"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 bg-neutral-50/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-neutral-200/50">
              <UserIcon className="w-3 h-3" />
              <span>Profile changes are saved to your local wallet</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}