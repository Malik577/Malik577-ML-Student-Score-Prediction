import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { StudentFeatures } from '../types';

interface StudentPredictionProps {
  studentFeatures: StudentFeatures;
  predictedScore: number | null;
  onFeatureChange: (feature: keyof StudentFeatures, value: string | number) => void;
  onMakePrediction: () => void;
}

export const StudentPrediction: React.FC<StudentPredictionProps> = ({
  studentFeatures,
  predictedScore,
  onFeatureChange,
  onMakePrediction
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Target className="h-6 w-6 mr-3 text-blue-600" />
          Student Performance Prediction
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Input student characteristics to predict their academic performance. 
          The model considers multiple factors including study habits, attendance, and environmental conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Factors */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Academic Factors
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Studied (per day)
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={studentFeatures.Hours_Studied}
                onChange={(e) => onFeatureChange('Hours_Studied', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendance Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={studentFeatures.Attendance}
                onChange={(e) => onFeatureChange('Attendance', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Scores
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={studentFeatures.Previous_Scores}
                onChange={(e) => onFeatureChange('Previous_Scores', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutoring Sessions (per month)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={studentFeatures.Tutoring_Sessions}
                onChange={(e) => onFeatureChange('Tutoring_Sessions', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Personal & Environmental Factors */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Personal & Environmental
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Hours (per night)
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={studentFeatures.Sleep_Hours}
                onChange={(e) => onFeatureChange('Sleep_Hours', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Physical Activity (hours/week)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={studentFeatures.Physical_Activity}
                onChange={(e) => onFeatureChange('Physical_Activity', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parental Involvement
              </label>
              <select
                value={studentFeatures.Parental_Involvement}
                onChange={(e) => onFeatureChange('Parental_Involvement', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access to Resources
              </label>
              <select
                value={studentFeatures.Access_to_Resources}
                onChange={(e) => onFeatureChange('Access_to_Resources', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
            Motivation & Activities
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivation Level
              </label>
              <select
                value={studentFeatures.Motivation_Level}
                onChange={(e) => onFeatureChange('Motivation_Level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extracurricular Activities
              </label>
              <select
                value={studentFeatures.Extracurricular_Activities}
                onChange={(e) => onFeatureChange('Extracurricular_Activities', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internet Access
              </label>
              <select
                value={studentFeatures.Internet_Access}
                onChange={(e) => onFeatureChange('Internet_Access', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peer Influence
              </label>
              <select
                value={studentFeatures.Peer_Influence}
                onChange={(e) => onFeatureChange('Peer_Influence', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Negative">Negative</option>
                <option value="Neutral">Neutral</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
            Institutional Factors
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher Quality
              </label>
              <select
                value={studentFeatures.Teacher_Quality}
                onChange={(e) => onFeatureChange('Teacher_Quality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Type
              </label>
              <select
                value={studentFeatures.School_Type}
                onChange={(e) => onFeatureChange('School_Type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Income
              </label>
              <select
                value={studentFeatures.Family_Income}
                onChange={(e) => onFeatureChange('Family_Income', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Disabilities
              </label>
              <select
                value={studentFeatures.Learning_Disabilities}
                onChange={(e) => onFeatureChange('Learning_Disabilities', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Button and Result */}
      <div className="text-center">
        <button
          onClick={onMakePrediction}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all"
        >
          Predict Performance
        </button>

        {predictedScore !== null && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl">
            <h4 className="text-2xl font-bold mb-2">Predicted Performance</h4>
            <p className="text-4xl font-bold mb-2">{predictedScore}/100</p>
            <p className="text-blue-100">
              {predictedScore >= 90 ? 'Excellent Performance' :
               predictedScore >= 80 ? 'Very Good Performance' :
               predictedScore >= 70 ? 'Good Performance' :
               predictedScore >= 60 ? 'Satisfactory Performance' :
               predictedScore >= 50 ? 'Needs Improvement' :
               'Requires Significant Support'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 