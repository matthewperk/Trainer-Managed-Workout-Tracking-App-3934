import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useWorkout } from '../context/WorkoutContext';
import ProgressChart from '../components/ProgressChart';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiTarget, FiTrendingUp, FiActivity } = FiIcons;

const WorkoutHistory = () => {
  const { workoutHistory } = useWorkout();

  // Sample data for charts
  const weightProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    values: [60, 62.5, 65, 67.5, 70]
  };

  const effortData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [7, 8, 6, 9, 7, 8, 6]
  };

  const consistencyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [85, 90, 88, 92, 95]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Workout History</h1>
            <p className="text-gray-600">Track your progress and achievements</p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Total Workouts</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-green-600">+3 this week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Avg. Effort</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">7.5</div>
            <div className="text-sm text-green-600">+0.3 vs last month</div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <ProgressChart
            data={weightProgressData}
            title="Weight Progress (kg)"
            type="line"
          />
          
          <ProgressChart
            data={effortData}
            title="Perceived Effort (This Week)"
            type="bar"
          />
          
          <ProgressChart
            data={consistencyData}
            title="Consistency Rate (%)"
            type="line"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h2>
          <div className="space-y-3">
            {workoutHistory.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{format(new Date(workout.date), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiTarget} className="w-4 h-4" />
                        <span>{workout.exercisesCompleted}/{workout.totalExercises}</span>
                      </div>
                    </div>
                    {workout.notes && (
                      <p className="mt-2 text-sm text-gray-700 italic">"{workout.notes}"</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {Math.round((workout.exercisesCompleted / workout.totalExercises) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;