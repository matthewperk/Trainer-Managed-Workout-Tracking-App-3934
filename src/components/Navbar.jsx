import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBarChart2, FiUser, FiSettings, FiUsers } = FiIcons;

const Navbar = ({ userType, setUserType }) => {
  const location = useLocation();

  const clientNavItems = [
    { icon: FiHome, label: 'Today', path: '/' },
    { icon: FiBarChart2, label: 'History', path: '/history' },
    { icon: FiUser, label: 'Profile', path: '/profile' }
  ];

  const trainerNavItems = [
    { icon: FiUsers, label: 'Clients', path: '/trainer' },
    { icon: FiBarChart2, label: 'Analytics', path: '/history' },
    { icon: FiSettings, label: 'Settings', path: '/profile' }
  ];

  const navItems = userType === 'trainer' ? trainerNavItems : clientNavItems;

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isActive 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-500 hover:text-primary-500'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-6 h-6" />
              </motion.div>
              <span className={`text-xs mt-1 ${
                isActive ? 'text-primary-500 font-medium' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        
        <button
          onClick={() => setUserType(userType === 'client' ? 'trainer' : 'client')}
          className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 text-gray-400 hover:text-primary-500"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full"
          >
            <SafeIcon icon={FiSettings} className="w-6 h-6" />
          </motion.div>
          <span className="text-xs mt-1">
            {userType === 'client' ? 'Trainer' : 'Client'}
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;