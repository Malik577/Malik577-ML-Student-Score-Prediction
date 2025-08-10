import { useState, useCallback } from 'react';
import { StudentData, ModelMetrics, TrainTestSplit, LinearModel } from '../types';
import mlService from '../services/mlService';

export const useMLPipeline = () => {
  const [rawData, setRawData] = useState<StudentData[]>([]);
  const [cleanedData, setCleanedData] = useState<StudentData[]>([]);
  const [trainTestData, setTrainTestData] = useState<TrainTestSplit | null>(null);
  const [model, setModel] = useState<LinearModel | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const runPipeline = useCallback(async () => {
    setIsProcessing(true);
    setCurrentStep(0);

    try {
      // Step 1: Data Generation
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Data Cleaning
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 3: Train/Test Split
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 4: Model Training
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 5: Evaluation
      setCurrentStep(5);
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = await mlService.runPipeline();
      
      setRawData(result.rawData);
      setCleanedData(result.cleanedData);
      setTrainTestData(result.trainTestData);
      setModel(result.model);
      setMetrics(result.metrics);
    } catch (error) {
      console.error('Error running pipeline:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const resetPipeline = useCallback(() => {
    setRawData([]);
    setCleanedData([]);
    setTrainTestData(null);
    setModel(null);
    setMetrics(null);
    setCurrentStep(0);
  }, []);

  return {
    rawData,
    cleanedData,
    trainTestData,
    model,
    metrics,
    isProcessing,
    currentStep,
    runPipeline,
    resetPipeline
  };
}; 