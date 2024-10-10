import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart2, Briefcase } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Tech Interview Tracker</h1>
        <p className="mb-4">Please log in or sign up to start tracking your tech interviews.</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Login
          </Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="mr-2" />
            Application Overview
          </h2>
          <ul className="space-y-2">
            <li>Total Applications: 5</li>
            <li>In Progress: 3</li>
            <li>Offers Received: 1</li>
            <li>Rejected: 1</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" />
            Interview Stage Breakdown
          </h2>
          <ul className="space-y-2">
            <li>HR Call: 2</li>
            <li>Technical Interview: 1</li>
            <li>Manager Interview: 1</li>
            <li>Job Offer: 1</li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <Link to="/applications" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          View All Applications
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;