import React from 'react';
import { 
  Brain, 
  Target, 
  Database,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          About This Project
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive machine learning system for predicting student academic performance 
          based on multiple factors including study habits, attendance, and environmental conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-3 text-blue-600" />
            Technical Implementation
          </h3>
          <div className="space-y-4 text-gray-700">
            <p><strong>Machine Learning:</strong> Linear Regression with feature engineering</p>
            <p><strong>Data Processing:</strong> Pandas, NumPy for data manipulation</p>
            <p><strong>Visualization:</strong> Matplotlib, Seaborn for insights</p>
            <p><strong>Frontend:</strong> React with TypeScript and Tailwind CSS</p>
            <p><strong>Backend:</strong> Python with scikit-learn</p>
            <p><strong>Architecture:</strong> Component-based React architecture</p>
            <p><strong>Styling:</strong> Modern UI with responsive design</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-3 text-green-600" />
            Project Goals
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>• Demonstrate complete ML pipeline from data to deployment</p>
            <p>• Provide interactive interface for educational insights</p>
            <p>• Show real-world application of predictive modeling</p>
            <p>• Enable educators to identify at-risk students</p>
            <p>• Support data-driven educational decision making</p>
            <p>• Showcase modern web development practices</p>
            <p>• Provide educational tool for performance analysis</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Dataset Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Database className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">6,607</p>
            <p className="text-blue-200">Student Records</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">20+</p>
            <p className="text-blue-200">Features Analyzed</p>
          </div>
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-2 text-blue-200" />
            <p className="text-3xl font-bold">64-69%</p>
            <p className="text-blue-200">Prediction Accuracy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-3 text-purple-600" />
            Target Users
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Educators & Teachers</p>
                <p className="text-sm text-gray-600">Identify at-risk students early and provide targeted support</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Students & Parents</p>
                <p className="text-sm text-gray-600">Understand performance factors and improvement areas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Administrators</p>
                <p className="text-sm text-gray-600">Make data-driven policy and resource decisions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Researchers</p>
                <p className="text-sm text-gray-600">Study academic performance patterns and correlations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-orange-600" />
            Key Features
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Interactive ML Pipeline</p>
                <p className="text-sm text-gray-600">Step-by-step execution with real-time progress</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Performance Prediction</p>
                <p className="text-sm text-gray-600">Multi-factor student performance analysis</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Data Visualization</p>
                <p className="text-sm text-gray-600">Charts and insights from ML analysis</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <p className="font-semibold">Responsive Design</p>
                <p className="text-sm text-gray-600">Works seamlessly on all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>React 18</p>
              <p>TypeScript</p>
              <p>Tailwind CSS</p>
              <p>Vite</p>
              <p>Lucide Icons</p>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-3">Backend</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Python 3.8+</p>
              <p>scikit-learn</p>
              <p>Pandas</p>
              <p>NumPy</p>
              <p>Matplotlib</p>
              <p>Seaborn</p>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-3">Development</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>ESLint</p>
              <p>PostCSS</p>
              <p>Git</p>
              <p>Jupyter</p>
              <p>Virtual Environment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 