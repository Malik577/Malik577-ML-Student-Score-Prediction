import { StudentData, ModelMetrics, TrainTestSplit, LinearModel } from '../types';

export class MLService {
  private static instance: MLService;

  private constructor() {}

  public static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  public generateDataset(): StudentData[] {
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
  }

  public cleanData(data: StudentData[]): StudentData[] {
    return data.filter(student => 
      student.study_hours > 0 && 
      student.study_hours <= 24 && 
      student.final_score >= 0 && 
      student.final_score <= 100
    );
  }

  public splitData(data: StudentData[]): TrainTestSplit {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor(data.length * 0.8);

    const X_train = shuffled.slice(0, splitIndex).map(s => s.study_hours);
    const y_train = shuffled.slice(0, splitIndex).map(s => s.final_score);
    const X_test = shuffled.slice(splitIndex).map(s => s.study_hours);
    const y_test = shuffled.slice(splitIndex).map(s => s.final_score);

    return { X_train, X_test, y_train, y_test };
  }

  public trainLinearRegression(X: number[], y: number[]): { slope: number; intercept: number } {
    const n = X.length;
    const sumX = X.reduce((sum, val) => sum + val, 0);
    const sumY = y.reduce((sum, val) => sum + val, 0);
    const sumXY = X.reduce((sum, val, i) => sum + val * y[i], 0);
    const sumXX = X.reduce((sum, val) => sum + val * val, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  public predict(X: number[], slope: number, intercept: number): number[] {
    return X.map(x => slope * x + intercept);
  }

  public calculateMetrics(yTrue: number[], yPred: number[]): ModelMetrics {
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
  }

  public async runPipeline(): Promise<{
    rawData: StudentData[];
    cleanedData: StudentData[];
    trainTestData: TrainTestSplit;
    model: LinearModel;
    metrics: ModelMetrics;
  }> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate data
    const rawData = this.generateDataset();
    
    // Clean data
    const cleanedData = this.cleanData(rawData);
    
    // Split data
    const trainTestData = this.splitData(cleanedData);
    
    // Train model
    const { slope, intercept } = this.trainLinearRegression(
      trainTestData.X_train,
      trainTestData.y_train
    );
    
    // Make predictions
    const predictions = this.predict(trainTestData.X_test, slope, intercept);
    
    // Calculate metrics
    const metrics = this.calculateMetrics(trainTestData.y_test, predictions);
    
    const model: LinearModel = {
      slope,
      intercept,
      predictions
    };

    return {
      rawData,
      cleanedData,
      trainTestData,
      model,
      metrics
    };
  }
}

export default MLService.getInstance(); 