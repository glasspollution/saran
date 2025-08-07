import React from 'react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Access your learning materials and track your progress.</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Completed Lessons: <span className="font-medium">0</span></p>
              <p className="text-sm text-gray-600">Assessments Taken: <span className="font-medium">0</span></p>
              <p className="text-sm text-gray-600">Study Streak: <span className="font-medium">0 days</span></p>
            </div>
          </div>

          {/* Study Materials */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Study Materials</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Browse Lessons
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Practice Tests
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Revision Notes
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed Lessons</span>
                <span className="text-sm font-medium">0/0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Practice Tests</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Study Streak</span>
                <span className="text-sm font-medium">0 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Courses */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Available Courses</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available yet</h3>
                <p className="text-gray-600 mb-4">
                  Course materials will appear here once your teachers create and share them with your class.
                </p>
                <p className="text-sm text-gray-500">
                  Contact your teacher to get access to course materials and assignments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Study Tips</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Effective Study Habits</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Review materials regularly, not just before exams</li>
                    <li>• Take breaks during long study sessions</li>
                    <li>• Practice active recall by testing yourself</li>
                    <li>• Create a consistent study schedule</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Using This Platform</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Access course materials shared by your teachers</li>
                    <li>• Complete practice tests to check your understanding</li>
                    <li>• Use revision notes for quick reviews</li>
                    <li>• Track your progress over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 