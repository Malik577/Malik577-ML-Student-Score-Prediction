export interface StudentData {
  id: number;
  study_hours: number;
  final_score: number;
}

export interface ModelMetrics {
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
}

export interface TrainTestSplit {
  X_train: number[];
  X_test: number[];
  y_train: number[];
  y_test: number[];
}

export interface LinearModel {
  slope: number;
  intercept: number;
  predictions: number[];
}

export interface StudentFeatures {
  Hours_Studied: number;
  Attendance: number;
  Parental_Involvement: 'Low' | 'Medium' | 'High';
  Access_to_Resources: 'Low' | 'Medium' | 'High';
  Extracurricular_Activities: 'Yes' | 'No';
  Sleep_Hours: number;
  Previous_Scores: number;
  Motivation_Level: 'Low' | 'Medium' | 'High';
  Internet_Access: 'Yes' | 'No';
  Tutoring_Sessions: number;
  Family_Income: 'Low' | 'Medium' | 'High';
  Teacher_Quality: 'Low' | 'Medium' | 'High';
  School_Type: 'Public' | 'Private';
  Peer_Influence: 'Positive' | 'Neutral' | 'Negative';
  Physical_Activity: number;
  Learning_Disabilities: 'Yes' | 'No';
  Parental_Education_Level: 'High School' | 'College' | 'Postgraduate';
  Distance_from_Home: 'Near' | 'Moderate' | 'Far';
  Gender: 'Male' | 'Female';
}

export type TabType = 'dashboard' | 'prediction' | 'analysis' | 'about';

export interface DataStats {
  count: number;
  avgScore: number;
  avgHours: number;
  minScore: number;
  maxScore: number;
  minHours: number;
  maxHours: number;
} 