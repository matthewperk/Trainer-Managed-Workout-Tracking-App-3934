import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [clients, setClients] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Sample data
  useEffect(() => {
    const sampleExercises = [
      {
        id: 1,
        name: 'Barbell Squat',
        category: 'Legs',
        muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        sets: [
          { setNumber: 1, plannedReps: 10, plannedWeight: 60, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 2, plannedReps: 10, plannedWeight: 60, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 3, plannedReps: 10, plannedWeight: 60, completedReps: null, completedWeight: null, completed: false }
        ],
        notes: '',
        perceivedEffort: null,
        timeSpent: 0,
        status: 'pending'
      },
      {
        id: 2,
        name: 'Dumbbell Shoulder Press',
        category: 'Shoulders',
        muscleGroups: ['Deltoids', 'Triceps'],
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        sets: [
          { setNumber: 1, plannedReps: 12, plannedWeight: 15, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 2, plannedReps: 12, plannedWeight: 15, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 3, plannedReps: 12, plannedWeight: 15, completedReps: null, completedWeight: null, completed: false }
        ],
        notes: '',
        perceivedEffort: null,
        timeSpent: 0,
        status: 'pending'
      },
      {
        id: 3,
        name: 'Leg Extension',
        category: 'Legs',
        muscleGroups: ['Quadriceps'],
        image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
        sets: [
          { setNumber: 1, plannedReps: 15, plannedWeight: 40, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 2, plannedReps: 15, plannedWeight: 40, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 3, plannedReps: 15, plannedWeight: 40, completedReps: null, completedWeight: null, completed: false },
          { setNumber: 4, plannedReps: 15, plannedWeight: 40, completedReps: null, completedWeight: null, completed: false }
        ],
        notes: '',
        perceivedEffort: null,
        timeSpent: 0,
        status: 'pending'
      }
    ];

    const sampleWorkout = {
      id: 1,
      date: format(new Date(), 'yyyy-MM-dd'),
      name: 'Upper Body Strength',
      exercises: sampleExercises,
      clientId: 1,
      trainerId: 1,
      completed: false
    };

    const sampleHistory = [
      {
        id: 1,
        date: '2024-01-15',
        name: 'Upper Body Strength',
        exercisesCompleted: 3,
        totalExercises: 3,
        duration: 45,
        notes: 'Great session, felt strong'
      },
      {
        id: 2,
        date: '2024-01-12',
        name: 'Lower Body Power',
        exercisesCompleted: 4,
        totalExercises: 4,
        duration: 50,
        notes: 'Legs were tired but pushed through'
      }
    ];

    const sampleClients = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2024-01-01',
        currentProgram: 'Strength Building',
        progress: {
          workoutsCompleted: 24,
          averageEffort: 7.5,
          consistency: 85
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        joinDate: '2024-01-15',
        currentProgram: 'Weight Loss',
        progress: {
          workoutsCompleted: 18,
          averageEffort: 8.2,
          consistency: 92
        }
      }
    ];

    setCurrentWorkout(sampleWorkout);
    setWorkoutHistory(sampleHistory);
    setClients(sampleClients);
    setExercises(sampleExercises);
  }, []);

  const updateExercise = (exerciseId, updates) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      )
    }));
  };

  const completeWorkout = () => {
    const completedWorkout = {
      ...currentWorkout,
      completed: true,
      completedAt: new Date().toISOString()
    };
    
    setWorkoutHistory(prev => [completedWorkout, ...prev]);
    setCurrentWorkout(null);
  };

  const addClient = (client) => {
    setClients(prev => [...prev, { ...client, id: Date.now() }]);
  };

  const createWorkoutForClient = (clientId, workout) => {
    // In a real app, this would create a new workout for the specified client
    console.log('Creating workout for client:', clientId, workout);
  };

  const value = {
    currentWorkout,
    setCurrentWorkout,
    workoutHistory,
    setWorkoutHistory,
    clients,
    setClients,
    exercises,
    setExercises,
    updateExercise,
    completeWorkout,
    addClient,
    createWorkoutForClient
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};