import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Brain, 
  Target,
  Database,
  Activity,
  Users,
  BookOpen
} from 'lucide-react';

export const Analysis: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Data Analysis & Insights
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore key insights from our student performance dataset and understand the factors 
          that most significantly impact academic success.
        </p>
      </div>

      {/* Key Insights Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Key Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">85%</p>
            <p className="text-blue-200">Attendance Correlation</p>
          </div>
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">78%</p>
            <p className="text-blue-200">Study Hours Impact</p>
          </div>
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">72%</p>
            <p className="text-blue-200">Previous Scores</p>
          </div>
          <div className="text-center">
            <Target className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">64-69%</p>
            <p className="text-blue-200">Model Accuracy</p>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Top Performance Factors
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Attendance Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">85%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Study Hours</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">78%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Previous Scores</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">72%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Parental Involvement</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">65%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Teacher Quality</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">58%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="h-5 w-5 mr-2 text-green-600" />
            Dataset Statistics
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Students</span>
              <span className="font-semibold text-gray-900">6,607</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Features Analyzed</span>
              <span className="font-semibold text-gray-900">20+</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Age Range</span>
              <span className="font-semibold text-gray-900">15-22 years</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Score Range</span>
              <span className="font-semibold text-gray-900">0-100</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Study Hours Range</span>
              <span className="font-semibold text-gray-900">0-24 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Patterns */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Performance Patterns & Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <Activity className="h-12 w-12 mx-auto mb-3 text-blue-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Study Hours Impact</h4>
            <p className="text-sm text-gray-600">
              Students studying 6+ hours daily show 40% higher scores than those studying less than 2 hours.
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Users className="h-12 w-12 mx-auto mb-3 text-green-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Attendance Correlation</h4>
            <p className="text-sm text-gray-600">
              95% of students with 90%+ attendance achieve passing grades, compared to 60% with low attendance.
            </p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <BookOpen className="h-12 w-12 mx-auto mb-3 text-purple-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Previous Performance</h4>
            <p className="text-sm text-gray-600">
              Students with previous scores above 70 have 80% chance of maintaining or improving performance.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Educational Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">For Students</h4>
            <ul className="space-y-2 text-green-100">
              <li>• Maintain at least 85% attendance rate</li>
              <li>• Study 6+ hours daily for optimal performance</li>
              <li>• Seek tutoring if previous scores are below 70</li>
              <li>• Engage in extracurricular activities</li>
              <li>• Maintain regular sleep schedule (7-9 hours)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">For Educators</h4>
            <ul className="space-y-2 text-green-100">
              <li>• Monitor attendance patterns closely</li>
              <li>• Provide targeted support for low performers</li>
              <li>• Encourage parental involvement</li>
              <li>• Offer additional resources for struggling students</li>
              <li>• Implement early intervention programs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Model Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">R² Score</h4>
            <p className="text-3xl font-bold text-blue-600">64-69%</p>
            <p className="text-sm text-gray-600">Prediction accuracy</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">RMSE</h4>
            <p className="text-3xl font-bold text-green-600">5-7</p>
            <p className="text-sm text-gray-600">Root mean square error</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">MAE</h4>
            <p className="text-3xl font-bold text-purple-600">4-6</p>
            <p className="text-sm text-gray-600">Mean absolute error</p>
          </div>
          
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">MSE</h4>
            <p className="text-3xl font-bold text-orange-600">25-49</p>
            <p className="text-sm text-gray-600">Mean square error</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 