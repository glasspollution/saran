import React from 'react';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your classroom and create engaging content for your students.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Active Lessons: <span className="font-medium">0</span></p>
            <p className="text-sm text-gray-600">Assessments: <span className="font-medium">0</span></p>
            <p className="text-sm text-gray-600">Students: <span className="font-medium">0</span></p>
          </div>
        </div>

        {/* Create Lesson Plan */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create Content</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              New Lesson Plan
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Create Assessment
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Generate Materials
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">No recent activities yet</p>
            <p className="text-xs text-gray-400">Start creating content to see your activity here</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Welcome to your teacher dashboard! Here you can create lesson plans, generate educational materials, 
                and manage your classroom content using AI-powered tools.
              </p>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Create lesson plans by describing your curriculum topics</li>
                <li>• Generate assessments and quizzes for your students</li>
                <li>• Produce revision materials and study guides</li>
                <li>• Customize content based on your classroom demographics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 