import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useWorkout } from '../context/WorkoutContext';
import ExerciseCard from '../components/ExerciseCard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiTarget, FiTrendingUp, FiClock } = FiIcons;

const WorkoutOverview = ({ userType }) => {
  const { currentWorkout } = useWorkout();

  if (!currentWorkout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <SafeIcon icon={FiTarget} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Workout Today</h2>
          <p className="text-gray-600">Your trainer hasn't assigned a workout for today.</p>
        </motion.div>
      </div>
    );
  }

  const completedExercises = currentWorkout.exercises.filter(ex => 
    ex.sets.every(set => set.completed)
  ).length;

  const totalExercises = currentWorkout.exercises.length;
  const progressPercentage = (completedExercises / totalExercises) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StrongBuddy</h1>
              <div className="flex items-center space-x-2 mt-1">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {format(new Date(currentWorkout.date), 'EEEE, MMMM d')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {completedExercises}/{totalExercises}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-primary-500 h-2 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Today's Workout</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiTarget} className="w-4 h-4" />
              <span>{currentWorkout.name}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {currentWorkout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
            />
          ))}
        </div>

        {completedExercises === totalExercises && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2 text-green-800">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
              <span className="font-semibold">Workout Complete!</span>
            </div>
            <p className="text-green-700 mt-1">
              Great job finishing today's workout. Your progress has been recorded.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WorkoutOverview;