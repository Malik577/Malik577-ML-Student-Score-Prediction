import { StudentData, ModelMetrics } from '../types';

export const generateDataset = (): StudentData[] => {
  const students: StudentData[] = [];
  const numStudents = 1000;

  for (let i = 0; i < numStudents; i++) {
    const studyHours = Math.floor(Math.random() * 20) + 1; // 1-20 hours
    const baseScore = 50;
    const studyImpact = studyHours * 2.5;
    const randomFactor = (Math.random() - 0.5) * 20;
    const finalScore = Math.max(0, Math.min(100, Math.round(baseScore + studyImpact + randomFactor)));

    students.push({
      id: i + 1,
      study_hours: studyHours,
      final_score: finalScore
    });
  }

  return students;
};

export const cleanData = (data: StudentData[]): StudentData[] => {
  return data.filter(student => 
    student.study_hours > 0 && 
    student.study_hours <= 24 && 
    student.final_score >= 0 && 
    student.final_score <= 100
  );
};

export const splitData = (data: StudentData[]) => {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(data.length * 0.8);

  const X_train = shuffled.slice(0, splitIndex).map(s => s.study_hours);
  const y_train = shuffled.slice(0, splitIndex).map(s => s.final_score);
  const X_test = shuffled.slice(splitIndex).map(s => s.study_hours);
  const y_test = shuffled.slice(splitIndex).map(s => s.final_score);

  return { X_train, X_test, y_train, y_test };
};

export const trainLinearRegression = (X: number[], y: number[]) => {
  const n = X.length;
  const sumX = X.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = X.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumXX = X.reduce((sum, val) => sum + val * val, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

export const predict = (X: number[], slope: number, intercept: number): number[] => {
  return X.map(x => slope * x + intercept);
};

export const calculateMetrics = (yTrue: number[], yPred: number[]): ModelMetrics => {
  const n = yTrue.length;
  
  // Calculate residuals
  const residuals = yTrue.map((y, i) => y - yPred[i]);
  
  // Mean Absolute Error
  const mae = residuals.reduce((sum, r) => sum + Math.abs(r), 0) / n;
  
  // Mean Squared Error
  const mse = residuals.reduce((sum, r) => sum + r * r, 0) / n;
  
  // Root Mean Squared Error
  const rmse = Math.sqrt(mse);
  
  // R-squared
  const meanY = yTrue.reduce((sum, y) => sum + y, 0) / n;
  const ssRes = residuals.reduce((sum, r) => sum + r * r, 0);
  const ssTot = yTrue.reduce((sum, y) => sum + (y - meanY) * (y - meanY), 0);
  const r2 = 1 - (ssRes / ssTot);

  return { mae, mse, rmse, r2 };
};

export const getDataStats = (data: StudentData[]) => {
  if (data.length === 0) return null;
  
  const scores = data.map(d => d.final_score);
  const hours = data.map(d => d.study_hours);
  
  return {
    count: data.length,
    avgScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
    avgHours: hours.reduce((sum, hour) => sum + hour, 0) / hours.length,
    minScore: Math.min(...scores),
    maxScore: Math.max(...scores),
    minHours: Math.min(...hours),
    maxHours: Math.max(...hours)
  };
}; 