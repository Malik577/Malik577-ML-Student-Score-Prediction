#!/usr/bin/env python3
"""
Main entry point for the Student Performance Predictor backend.
Run this file to execute the complete ML pipeline.
"""

import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from notebooks.student_score_prediction import StudentScorePredictor
from config import DATA_PATH

def main():
    """Main function to run the complete ML pipeline."""
    print("🎓 Student Performance Predictor - ML Pipeline")
    print("=" * 50)
    
    try:
        # Initialize the predictor
        predictor = StudentScorePredictor(DATA_PATH)
        
        # Run the complete analysis
        print("\n🚀 Starting ML Pipeline...")
        predictor.run_complete_analysis()
        
        print("\n✅ ML Pipeline completed successfully!")
        print("\n📊 Results Summary:")
        print(f"   • Dataset: {predictor.data.shape[0]} students, {predictor.data.shape[1]} features")
        print(f"   • Model: Linear Regression")
        print(f"   • Performance: Check the generated visualizations for detailed metrics")
        
    except FileNotFoundError:
        print(f"❌ Error: Data file not found at {DATA_PATH}")
        print("   Please ensure the StudentPerformanceFactors.csv file is in the data directory.")
    except Exception as e:
        print(f"❌ Error running pipeline: {str(e)}")
        print("   Please check the error details above and try again.")

if __name__ == "__main__":
    main() 