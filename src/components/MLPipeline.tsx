import React from 'react';
import { 
  Play, 
  CheckCircle, 
  BarChart, 
  TrendingUp, 
  Target, 
  Activity,
  Database
} from 'lucide-react';
import { StudentData, ModelMetrics, LinearModel, TrainTestSplit } from '../types';
import { 
  generateDataset, 
  cleanData, 
  splitData, 
  trainLinearRegression, 
  predict, 
  calculateMetrics,
  getDataStats
} from '../utils/mlUtils';

interface MLPipelineProps {
  rawData: StudentData[];
  cleanedData: StudentData[];
  trainTestData: TrainTestSplit | null;
  model: LinearModel | null;
  metrics: ModelMetrics | null;
  isProcessing: boolean;
  currentStep: number;
  onDataUpdate: (data: StudentData[], cleaned: StudentData[], split: TrainTestSplit | null, model: LinearModel | null, metrics: ModelMetrics | null) => void;
}

const steps = [
  'Generate Dataset',
  'Clean Data',
  'Split Data',
  'Train Model',
  'Evaluate Model'
];

export const MLPipeline: React.FC<MLPipelineProps> = ({
  rawData,
  cleanedData,
  model,
  metrics,
  isProcessing,
  currentStep,
  onDataUpdate
}) => {
  const runPipeline = async () => {
    // Step 1: Generate Dataset
    await new Promise(resolve => setTimeout(resolve, 800));
    const data = generateDataset();
    
    // Step 2: Data Cleaning & Visualization
    await new Promise(resolve => setTimeout(resolve, 800));
    const cleaned = cleanData(data);
    
    // Step 3: Train/Test Split
    await new Promise(resolve => setTimeout(resolve, 800));
    const split = splitData(cleaned);
    
    // Step 4: Train Model
    await new Promise(resolve => setTimeout(resolve, 800));
    const { slope, intercept } = trainLinearRegression(split.X_train, split.y_train);
    const trainPredictions = predict(split.X_train, slope, intercept);
    const testPredictions = predict(split.X_test, slope, intercept);
    
    const modelData = {
      slope,
      intercept,
      predictions: [...trainPredictions, ...testPredictions]
    };
    
    // Step 5: Evaluate Model
    await new Promise(resolve => setTimeout(resolve, 800));
    const trainMetrics = calculateMetrics(split.y_train, trainPredictions);
    const testMetrics = calculateMetrics(split.y_test, testPredictions);
    
    const finalMetrics = {
      mae: (trainMetrics.mae + testMetrics.mae) / 2,
      mse: (trainMetrics.mse + testMetrics.mse) / 2,
      rmse: (trainMetrics.rmse + testMetrics.rmse) / 2,
      r2: (trainMetrics.r2 + testMetrics.r2) / 2
    };
    
    onDataUpdate(data, cleaned, split, modelData, finalMetrics);
  };

  const rawStats = getDataStats(rawData);
  const cleanedStats = getDataStats(cleanedData);

  return (
    <div className="space-y-8">
      {/* Pipeline Control */}
      <div className="flex justify-center">
        <button
          onClick={runPipeline}
          disabled={isProcessing}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
          } text-white shadow-lg`}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Run ML Pipeline
            </div>
          )}
        </button>
      </div>

      {/* Pipeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all ${
              index <= currentStep
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              {index < currentStep ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : index === currentStep ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            <p className="text-sm font-medium text-center">{step}</p>
          </div>
        ))}
      </div>

      {/* Results Display */}
      {model && metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">R² Score</p>
                <p className="text-3xl font-bold">{(metrics.r2 * 100).toFixed(1)}%</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">RMSE</p>
                <p className="text-3xl font-bold">{metrics.rmse.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">MAE</p>
                <p className="text-3xl font-bold">{metrics.mae.toFixed(2)}</p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">MSE</p>
                <p className="text-3xl font-bold">{metrics.mse.toFixed(2)}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>
      )}

      {/* Data Overview */}
      {rawData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              Raw Dataset
            </h4>
            {rawStats && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-semibold">{rawStats.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Study Hours:</span>
                  <span className="font-semibold">{rawStats.avgHours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Score:</span>
                  <span className="font-semibold">{rawStats.avgScore.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Score Range:</span>
                  <span className="font-semibold">{rawStats.minScore} - {rawStats.maxScore}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-green-600" />
              Cleaned Dataset
            </h4>
            {cleanedStats && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-semibold">{cleanedStats.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Study Hours:</span>
                  <span className="font-semibold">{cleanedStats.avgHours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Score:</span>
                  <span className="font-semibold">{cleanedStats.avgScore.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Score Range:</span>
                  <span className="font-semibold">{cleanedStats.minScore} - {cleanedStats.maxScore}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 