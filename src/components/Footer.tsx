import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-lg font-semibold mb-2">Student Performance Predictor</p>
          <p className="text-gray-400">Powered by Machine Learning & AI</p>
          <p className="text-sm text-gray-500 mt-4">
            Built for educational purposes • Demonstrates ML pipeline implementation
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <h4 className="font-semibold text-white mb-2">Features</h4>
                <ul className="space-y-1">
                  <li>Machine Learning Pipeline</li>
                  <li>Performance Prediction</li>
                  <li>Data Visualization</li>
                  <li>Interactive Dashboard</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Technology</h4>
                <ul className="space-y-1">
                  <li>React + TypeScript</li>
                  <li>Python ML Backend</li>
                  <li>Tailwind CSS</li>
                  <li>scikit-learn</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Dataset</h4>
                <ul className="space-y-1">
                  <li>6,607 Student Records</li>
                  <li>20+ Features Analyzed</li>
                  <li>64-69% Accuracy</li>
                  <li>Real-world Factors</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>© 2024 Student Performance Predictor. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ for educational excellence</p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 