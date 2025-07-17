import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWorkout } from '../context/WorkoutContext';
import SetLogger from '../components/SetLogger';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiClock, FiTarget, FiEdit3, FiSave } = FiIcons;

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentWorkout, updateExercise } = useWorkout();
  const [exercise, setExercise] = useState(null);
  const [notes, setNotes] = useState('');
  const [perceivedEffort, setPerceivedEffort] = useState(5);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (currentWorkout) {
      const foundExercise = currentWorkout.exercises.find(ex => ex.id === parseInt(id));
      if (foundExercise) {
        setExercise(foundExercise);
        setNotes(foundExercise.notes || '');
        setPerceivedEffort(foundExercise.perceivedEffort || 5);
      }
    }
  }, [currentWorkout, id]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSetUpdate = (updatedSet) => {
    const updatedSets = exercise.sets.map(set => 
      set.setNumber === updatedSet.setNumber ? updatedSet : set
    );
    
    const updatedExercise = {
      ...exercise,
      sets: updatedSets,
      status: updatedSets.every(set => set.completed) ? 'completed' : 'in-progress'
    };
    
    setExercise(updatedExercise);
    updateExercise(exercise.id, updatedExercise);
  };

  const handleSaveNotes = () => {
    const updatedExercise = {
      ...exercise,
      notes,
      perceivedEffort,
      timeSpent: timer
    };
    
    updateExercise(exercise.id, updatedExercise);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exercise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{exercise.name}</h1>
              <p className="text-gray-600">{exercise.category}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-gray-600">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span className="font-mono">{formatTime(timer)}</span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isTimerRunning 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {exercise.muscleGroups.map((muscle, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <SafeIcon icon={FiTarget} className="w-5 h-5" />
            <span>Sets</span>
          </h2>
          
          {exercise.sets.map((set) => (
            <SetLogger
              key={set.setNumber}
              set={set}
              onUpdate={handleSetUpdate}
              setNumber={set.setNumber}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <SafeIcon icon={FiEdit3} className="w-5 h-5" />
            <span>Exercise Notes</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perceived Effort (1-10)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={perceivedEffort}
                  onChange={(e) => setPerceivedEffort(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-center font-semibold text-primary-600">
                  {perceivedEffort}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did this exercise feel? Any observations?"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleSaveNotes}
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Notes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExerciseDetail;