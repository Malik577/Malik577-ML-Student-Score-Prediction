import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import Dashboard from './pages/Dashboard';
import { StudentPrediction } from './components/StudentPrediction';
import { Analysis } from './components/Analysis';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { TabType, StudentFeatures } from './types';
import { useMLPipeline } from './hooks/useMLPipeline';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const mlPipeline = useMLPipeline();
  const [studentFeatures, setStudentFeatures] = useState<StudentFeatures>({
    Hours_Studied: 20,
    Attendance: 85,
    Parental_Involvement: 'Medium',
    Access_to_Resources: 'Medium',
    Extracurricular_Activities: 'Yes',
    Sleep_Hours: 7,
    Previous_Scores: 75,
    Motivation_Level: 'Medium',
    Internet_Access: 'Yes',
    Tutoring_Sessions: 1,
    Family_Income: 'Medium',
    Teacher_Quality: 'Medium',
    School_Type: 'Public',
    Peer_Influence: 'Positive',
    Physical_Activity: 3,
    Learning_Disabilities: 'No',
    Parental_Education_Level: 'College',
    Distance_from_Home: 'Near',
    Gender: 'Female'
  });
  const [predictedScore, setPredictedScore] = useState<number | null>(null);

  const handleFeatureChange = (feature: keyof StudentFeatures, value: string | number) => {
    setStudentFeatures(prev => ({
      ...prev,
      [feature]: value
    }));
  };

  const handleMakePrediction = () => {
    const baseScore = 50;
    const studyImpact = (studentFeatures.Hours_Studied - 10) * 2;
    const attendanceImpact = (studentFeatures.Attendance - 75) * 0.2;
    const previousScoreImpact = (studentFeatures.Previous_Scores - 70) * 0.3;
    const sleepImpact = (studentFeatures.Sleep_Hours - 7) * 1.5;
    
    let score = baseScore + studyImpact + attendanceImpact + previousScoreImpact + sleepImpact;
    
    if (studentFeatures.Motivation_Level === 'High') score += 5;
    if (studentFeatures.Access_to_Resources === 'High') score += 3;
    if (studentFeatures.Parental_Involvement === 'High') score += 2;
    if (studentFeatures.Teacher_Quality === 'High') score += 3;
    if (studentFeatures.Peer_Influence === 'Positive') score += 2;
    
    score = Math.max(0, Math.min(100, score));
    setPredictedScore(Math.round(score));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            rawData={mlPipeline.rawData}
            cleanedData={mlPipeline.cleanedData}
            trainTestData={mlPipeline.trainTestData}
            model={mlPipeline.model}
            metrics={mlPipeline.metrics}
            isProcessing={mlPipeline.isProcessing}
            currentStep={mlPipeline.currentStep}
            onRunPipeline={mlPipeline.runPipeline}
          />
        );
      case 'prediction':
        return (
          <StudentPrediction
            studentFeatures={studentFeatures}
            predictedScore={predictedScore}
            onFeatureChange={handleFeatureChange}
            onMakePrediction={handleMakePrediction}
          />
        );
      case 'analysis':
        return <Analysis />;
      case 'about':
        return <About />;
      default:
        return (
          <Dashboard
            rawData={mlPipeline.rawData}
            cleanedData={mlPipeline.cleanedData}
            trainTestData={mlPipeline.trainTestData}
            model={mlPipeline.model}
            metrics={mlPipeline.metrics}
            isProcessing={mlPipeline.isProcessing}
            currentStep={mlPipeline.currentStep}
            onRunPipeline={mlPipeline.runPipeline}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pt-16">
        {renderActiveTab()}
      </main>
      <Footer />
    </div>
  );
}

export default App;