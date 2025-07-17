import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import WorkoutOverview from './pages/WorkoutOverview';
import ExerciseDetail from './pages/ExerciseDetail';
import WorkoutHistory from './pages/WorkoutHistory';
import TrainerDashboard from './pages/TrainerDashboard';
import ClientProfile from './pages/ClientProfile';
import { WorkoutProvider } from './context/WorkoutContext';
import './App.css';

function App() {
  const [userType, setUserType] = useState('client'); // 'client' or 'trainer'

  return (
    <WorkoutProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<WorkoutOverview userType={userType} />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/history" element={<WorkoutHistory />} />
              <Route path="/trainer" element={<TrainerDashboard />} />
              <Route path="/profile" element={<ClientProfile />} />
            </Routes>
            <Navbar userType={userType} setUserType={setUserType} />
          </motion.div>
        </div>
      </Router>
    </WorkoutProvider>
  );
}

export default App;