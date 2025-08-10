import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  CheckCircle, 
  Brain,
  Play,
  Target,
  School,
  BrainCircuit,
  BarChart
} from 'lucide-react';

interface StudentData {
  id: number;
  study_hours: number;
  final_score: number;
}

interface ModelMetrics {
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
}

interface TrainTestSplit {
  X_train: number[];
  X_test: number[];
  y_train: number[];
  y_test: number[];
}

interface LinearModel {
  slope: number;
  intercept: number;
  predictions: number[];
}

interface DashboardProps {
  rawData: StudentData[];
  cleanedData: StudentData[];
  trainTestData: TrainTestSplit | null;
  model: LinearModel | null;
  metrics: ModelMetrics | null;
  isProcessing: boolean;
  currentStep: number;
  onRunPipeline: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  rawData,
  cleanedData,
  metrics,
  isProcessing,
  currentStep,
  onRunPipeline
}) => {
  const getDataStats = (data: StudentData[]) => {
    if (data.length === 0) return { count: 0, avgScore: 0, avgHours: 0 };
    const avgScore = data.reduce((sum, student) => sum + student.final_score, 0) / data.length;
    const avgHours = data.reduce((sum, student) => sum + student.study_hours, 0) / data.length;
    return { count: data.length, avgScore: avgScore.toFixed(1), avgHours: avgHours.toFixed(1) };
  };

  const rawStats = getDataStats(rawData);
  const cleanedStats = getDataStats(cleanedData);

  const pipelineSteps = [
    { name: 'Data Generation', icon: Database, description: 'Generate synthetic student data' },
    { name: 'Data Cleaning', icon: CheckCircle, description: 'Clean and validate data' },
    { name: 'Train/Test Split', icon: TrendingUp, description: 'Split data for training and testing' },
    { name: 'Model Training', icon: Brain, description: 'Train linear regression model' },
    { name: 'Evaluation', icon: BarChart, description: 'Calculate model metrics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 Student Performance Predictor
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Academic Success Analysis Platform
          </p>
        </div>

        {/* Pipeline Control */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
              <BrainCircuit className="text-blue-600" />
              ML Pipeline Control
            </h2>
            <button
              onClick={onRunPipeline}
              disabled={isProcessing}
              className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Run Complete Pipeline
                </>
              )}
            </button>
          </div>

          {/* Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div
                  key={step.name}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCompleted
                      ? 'border-green-500 bg-green-50'
                      : isCurrent
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-800 mb-1">
                      {step.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Raw Data Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Database className="text-blue-600" />
              Raw Data Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{rawStats.count}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{rawStats.avgScore}</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{rawStats.avgHours}</div>
                <div className="text-sm text-gray-600">Avg Hours</div>
              </div>
            </div>
          </div>

          {/* Cleaned Data Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              Cleaned Data Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{cleanedStats.count}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{cleanedStats.avgScore}</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{cleanedStats.avgHours}</div>
                <div className="text-sm text-gray-600">Avg Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance */}
        {metrics && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart className="text-purple-600" />
              Model Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{metrics.r2.toFixed(3)}</div>
                <div className="text-sm text-gray-600">R² Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{metrics.rmse.toFixed(2)}</div>
                <div className="text-sm text-gray-600">RMSE</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{metrics.mae.toFixed(2)}</div>
                <div className="text-sm text-gray-600">MAE</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{metrics.mse.toFixed(2)}</div>
                <div className="text-sm text-gray-600">MSE</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Make Predictions</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Use our trained model to predict student performance based on various factors.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="h-8 w-8" />
              <h3 className="text-xl font-semibold">View Analysis</h3>
            </div>
            <p className="text-green-100 mb-4">
              Explore detailed analysis of student performance factors and correlations.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <School className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Learn More</h3>
            </div>
            <p className="text-purple-100 mb-4">
              Understand how our machine learning model works and its applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 