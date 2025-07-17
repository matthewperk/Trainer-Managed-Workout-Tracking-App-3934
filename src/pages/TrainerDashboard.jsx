import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWorkout } from '../context/WorkoutContext';
import ProgressChart from '../components/ProgressChart';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiTrendingUp, FiCalendar, FiTarget, FiEdit3 } = FiIcons;

const TrainerDashboard = () => {
  const { clients, addClient, createWorkoutForClient } = useWorkout();
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);

  // Sample progress data
  const clientProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [75, 82, 88, 92]
  };

  const CreateWorkoutModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Workout</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Upper Body Strength"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              placeholder="Special instructions or focus areas..."
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowCreateWorkout(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowCreateWorkout(false);
              // Handle workout creation
            }}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Create Workout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Trainer Dashboard</h1>
            <p className="text-gray-600">Manage your clients and track their progress</p>
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
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Active Clients</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
            <div className="text-sm text-green-600">+2 this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Avg. Progress</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-green-600">+5% vs last month</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Clients</h2>
          <button
            onClick={() => setShowCreateWorkout(true)}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Create Workout</span>
          </button>
        </div>

        <div className="space-y-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{client.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>Joined {client.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiTarget} className="w-4 h-4" />
                      <span>{client.currentProgram}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary-600">
                    {client.progress.consistency}%
                  </div>
                  <div className="text-xs text-gray-500">Consistency</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {client.progress.workoutsCompleted}
                  </div>
                  <div className="text-xs text-gray-500">Workouts</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {client.progress.averageEffort}
                  </div>
                  <div className="text-xs text-gray-500">Avg. Effort</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {client.progress.consistency}%
                  </div>
                  <div className="text-xs text-gray-500">Consistency</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedClient(client)}
                  className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 border border-primary-200 rounded-md hover:bg-primary-50"
                >
                  View Progress
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center space-x-1">
                  <SafeIcon icon={FiEdit3} className="w-3 h-3" />
                  <span>Edit Program</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedClient.name}'s Progress
              </h3>
              <ProgressChart
                data={clientProgressData}
                title="Overall Progress (%)"
                type="line"
              />
            </div>
          </motion.div>
        )}
      </div>

      {showCreateWorkout && <CreateWorkoutModal />}
    </div>
  );
};

export default TrainerDashboard;