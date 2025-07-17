import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiEdit3 } = FiIcons;

const SetLogger = ({ set, onUpdate, setNumber }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [reps, setReps] = useState(set.completedReps || set.plannedReps);
  const [weight, setWeight] = useState(set.completedWeight || set.plannedWeight);

  const handleSave = () => {
    onUpdate({
      ...set,
      completedReps: parseInt(reps),
      completedWeight: parseFloat(weight),
      completed: true
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setReps(set.completedReps || set.plannedReps);
    setWeight(set.completedWeight || set.plannedWeight);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: setNumber * 0.1 }}
      className={`bg-white rounded-lg border-2 p-4 ${
        set.completed 
          ? 'border-green-200 bg-green-50' 
          : 'border-gray-200 hover:border-primary-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">Set {set.setNumber}</h4>
        <div className="flex items-center space-x-2">
          {set.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-1 text-green-600"
            >
              <SafeIcon icon={FiCheck} className="w-4 h-4" />
              <span className="text-sm font-medium">Done</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary-500"
          >
            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reps
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Target: {set.plannedReps}</span>
            {isEditing ? (
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
              />
            ) : (
              <span className={`font-semibold ${
                set.completed ? 'text-green-600' : 'text-gray-900'
              }`}>
                {set.completedReps || set.plannedReps}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Target: {set.plannedWeight}</span>
            {isEditing ? (
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                step="0.5"
              />
            ) : (
              <span className={`font-semibold ${
                set.completed ? 'text-green-600' : 'text-gray-900'
              }`}>
                {set.completedWeight || set.plannedWeight}
              </span>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end space-x-2 mt-4"
        >
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center space-x-1"
          >
            <SafeIcon icon={FiCheck} className="w-4 h-4" />
            <span>Save</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SetLogger;