import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiCircle, FiClock, FiTarget } = FiIcons;

const ExerciseCard = ({ exercise, index }) => {
  const completedSets = exercise.sets.filter(set => set.completed).length;
  const totalSets = exercise.sets.length;
  const isCompleted = completedSets === totalSets;
  const isInProgress = completedSets > 0 && completedSets < totalSets;

  const getStatusIcon = () => {
    if (isCompleted) return FiCheckCircle;
    if (isInProgress) return FiClock;
    return FiCircle;
  };

  const getStatusColor = () => {
    if (isCompleted) return 'text-green-500';
    if (isInProgress) return 'text-yellow-500';
    return 'text-gray-400';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (isInProgress) return 'In Progress';
    return 'Not Started';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={`/exercise/${exercise.id}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {exercise.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {exercise.category}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <SafeIcon icon={FiTarget} className="w-4 h-4" />
                    <span>
                      {totalSets} × {exercise.sets[0]?.plannedReps} @ {exercise.sets[0]?.plannedWeight}kg
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
                    <SafeIcon icon={getStatusIcon()} className="w-5 h-5" />
                    <span className="text-sm font-medium">{getStatusText()}</span>
                  </div>
                  
                  {isInProgress && (
                    <div className="mt-1 text-xs text-gray-500">
                      {completedSets}/{totalSets} sets
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroups.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;