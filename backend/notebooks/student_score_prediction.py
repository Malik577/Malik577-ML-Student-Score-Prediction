#!/usr/bin/env python3
"""
Student Score Prediction Model
Task: Build a model to predict students' exam scores based on various factors
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import LabelEncoder, StandardScaler
import warnings
warnings.filterwarnings('ignore')
import os

# Set style for better visualizations
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class StudentScorePredictor:
    def __init__(self, data_path):
        """Initialize the predictor with data path"""
        self.data_path = data_path
        self.data = None
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        
    def load_data(self):
        """Load the dataset"""
        print("Loading dataset...")
        self.data = pd.read_csv(self.data_path)
        print(f"Dataset loaded successfully! Shape: {self.data.shape}")
        return self.data
    
    def explore_data(self):
        """Basic data exploration and information"""
        print("\n=== DATASET OVERVIEW ===")
        print(f"Dataset shape: {self.data.shape}")
        print(f"Number of students: {len(self.data)}")
        print(f"Number of features: {len(self.data.columns)}")
        
        print("\n=== COLUMN NAMES ===")
        for i, col in enumerate(self.data.columns):
            print(f"{i+1:2d}. {col}")
        
        print("\n=== DATA TYPES ===")
        print(self.data.dtypes)
        
        print("\n=== MISSING VALUES ===")
        missing_values = self.data.isnull().sum()
        if missing_values.sum() == 0:
            print("No missing values found!")
        else:
            print(missing_values[missing_values > 0])
        
        print("\n=== BASIC STATISTICS ===")
        print(self.data.describe())
        
        return self.data
    
    def clean_data(self):
        """Clean and preprocess the data"""
        print("\n=== DATA CLEANING ===")
        
        # Check for missing values
        if self.data.isnull().sum().sum() > 0:
            print("Handling missing values...")
            # For categorical columns, fill with mode
            categorical_cols = self.data.select_dtypes(include=['object']).columns
            for col in categorical_cols:
                if self.data[col].isnull().sum() > 0:
                    mode_value = self.data[col].mode()[0]
                    self.data[col].fillna(mode_value, inplace=True)
                    print(f"Filled missing values in {col} with mode: {mode_value}")
            
            # For numerical columns, fill with median
            numerical_cols = self.data.select_dtypes(include=[np.number]).columns
            for col in numerical_cols:
                if self.data[col].isnull().sum() > 0:
                    median_value = self.data[col].median()
                    self.data[col].fillna(median_value, inplace=True)
                    print(f"Filled missing values in {col} with median: {median_value}")
        
        # Handle categorical variables
        print("Encoding categorical variables...")
        categorical_cols = self.data.select_dtypes(include=['object']).columns
        
        for col in categorical_cols:
            if col != 'final_score':  # Don't encode the target variable
                le = LabelEncoder()
                self.data[col] = le.fit_transform(self.data[col])
                self.label_encoders[col] = le
                print(f"Encoded {col}: {dict(zip(le.classes_, range(len(le.classes_))))}")
        
        print("Data cleaning completed!")
        return self.data
    
    def visualize_data(self):
        """Create visualizations to understand the data"""
        print("\n=== CREATING VISUALIZATIONS ===")
        
        # Set up the plotting area
        fig, axes = plt.subplots(2, 3, figsize=(18, 12))
        fig.suptitle('Student Performance Data Analysis', fontsize=16, fontweight='bold')
        
        # 1. Distribution of Exam Scores
        axes[0, 0].hist(self.data['final_score'], bins=30, alpha=0.7, color='skyblue', edgecolor='black')
        axes[0, 0].set_title('Distribution of Exam Scores')
        axes[0, 0].set_xlabel('Exam Score')
        axes[0, 0].set_ylabel('Frequency')
        axes[0, 0].axvline(self.data['final_score'].mean(), color='red', linestyle='--', 
                           label=f'Mean: {self.data["final_score"].mean():.2f}')
        axes[0, 0].legend()
        
        # 2. Hours Studied vs Exam Score
        axes[0, 1].scatter(self.data['Hours_Studied'], self.data['final_score'], alpha=0.6, color='green')
        axes[0, 1].set_title('Hours Studied vs Exam Score')
        axes[0, 1].set_xlabel('Hours Studied')
        axes[0, 1].set_ylabel('Exam Score')
        
        # Add trend line
        z = np.polyfit(self.data['Hours_Studied'], self.data['final_score'], 1)
        p = np.poly1d(z)
        axes[0, 1].plot(self.data['Hours_Studied'], p(self.data['Hours_Studied']), "r--", alpha=0.8)
        
        # 3. Attendance vs Exam Score
        axes[0, 2].scatter(self.data['Attendance'], self.data['final_score'], alpha=0.6, color='orange')
        axes[0, 2].set_title('Attendance vs Exam Score')
        axes[0, 2].set_xlabel('Attendance (%)')
        axes[0, 2].set_ylabel('Exam Score')
        
        # Add trend line
        z = np.polyfit(self.data['Attendance'], self.data['final_score'], 1)
        p = np.poly1d(z)
        axes[0, 2].plot(self.data['Attendance'], p(self.data['Attendance']), "r--", alpha=0.8)
        
        # 4. Previous Scores vs Exam Score
        axes[1, 0].scatter(self.data['Previous_Scores'], self.data['final_score'], alpha=0.6, color='purple')
        axes[1, 0].set_title('Previous Scores vs Exam Score')
        axes[1, 0].set_xlabel('Previous Scores')
        axes[1, 0].set_ylabel('Exam Score')
        
        # Add trend line
        z = np.polyfit(self.data['Previous_Scores'], self.data['final_score'], 1)
        p = np.poly1d(z)
        axes[1, 0].plot(self.data['Previous_Scores'], p(self.data['Previous_Scores']), "r--", alpha=0.8)
        
        # 5. Sleep Hours vs Exam Score
        axes[1, 1].scatter(self.data['Sleep_Hours'], self.data['final_score'], alpha=0.6, color='brown')
        axes[1, 1].set_title('Sleep Hours vs Exam Score')
        axes[1, 1].set_xlabel('Sleep Hours')
        axes[1, 1].set_ylabel('Exam Score')
        
        # Add trend line
        z = np.polyfit(self.data['Sleep_Hours'], self.data['final_score'], 1)
        p = np.poly1d(z)
        axes[1, 1].plot(self.data['Sleep_Hours'], p(self.data['Sleep_Hours']), "r--", alpha=0.8)
        
        # 6. Correlation heatmap of key numerical features
        key_features = ['Hours_Studied', 'Attendance', 'Previous_Scores', 'Sleep_Hours', 'final_score']
        correlation_matrix = self.data[key_features].corr()
        
        im = axes[1, 2].imshow(correlation_matrix, cmap='coolwarm', aspect='auto')
        axes[1, 2].set_title('Correlation Heatmap')
        axes[1, 2].set_xticks(range(len(key_features)))
        axes[1, 2].set_yticks(range(len(key_features)))
        axes[1, 2].set_xticklabels(key_features, rotation=45)
        axes[1, 2].set_yticklabels(key_features)
        
        # Add correlation values as text
        for i in range(len(key_features)):
            for j in range(len(key_features)):
                text = axes[1, 2].text(j, i, f'{correlation_matrix.iloc[i, j]:.2f}',
                                       ha="center", va="center", color="black", fontweight='bold')
        
        plt.tight_layout()
        plt.savefig('student_performance_analysis.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # Additional correlation analysis
        print("\n=== CORRELATION WITH EXAM SCORE ===")
        correlations = self.data.corr()['final_score'].sort_values(ascending=False)
        print(correlations)
        
        return correlations
    
    def prepare_features(self):
        """Prepare features for modeling"""
        print("\n=== PREPARING FEATURES ===")
        
        # Select features and target
        X = self.data.drop(['id', 'final_score'], axis=1)
        y = self.data['final_score']
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=X.columns)
        
        print(f"Features prepared: {X.shape[1]} features")
        return X_scaled, y

    def train_model(self):
        """Train the linear regression model"""
        print("\n=== TRAINING MODEL ===")
        
        # Prepare data
        X, y = self.prepare_features()
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        print(f"Training set size: {X_train.shape[0]}")
        print(f"Test set size: {X_test.shape[0]}")
        
        # Train model
        self.model = LinearRegression()
        self.model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = self.model.predict(X_test)
        
        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print("\n=== MODEL PERFORMANCE ===")
        print(f"Mean Squared Error: {mse:.2f}")
        print(f"Root Mean Squared Error: {rmse:.2f}")
        print(f"Mean Absolute Error: {mae:.2f}")
        print(f"R² Score: {r2:.2f}")
        
        return X_train, X_test, y_train, y_test, y_pred

    def visualize_predictions(self):
        """Create visualizations of model predictions"""
        print("\n=== CREATING VISUALIZATIONS ===")
        
        # Get training data and predictions
        X_train, X_test, y_train, y_test, y_pred = self.train_model()
        
        # Create directory for plots if it doesn't exist
        os.makedirs('plots', exist_ok=True)
        
        # Actual vs Predicted Plot
        plt.figure(figsize=(10, 6))
        plt.scatter(y_test, y_pred, alpha=0.5)
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
        plt.xlabel('Actual Final Score')
        plt.ylabel('Predicted Final Score')
        plt.title('Actual vs Predicted Student Scores')
        plt.tight_layout()
        plt.savefig('plots/actual_vs_predicted.png')
        plt.close()
        
        # Feature Importance Plot
        feature_importance = pd.DataFrame({
            'feature': X_train.columns,
            'importance': abs(self.model.coef_)
        })
        feature_importance = feature_importance.sort_values('importance', ascending=True)
        
        plt.figure(figsize=(12, 8))
        plt.barh(feature_importance['feature'], feature_importance['importance'])
        plt.xlabel('Absolute Coefficient Value')
        plt.title('Feature Importance')
        plt.tight_layout()
        plt.savefig('plots/feature_importance.png')
        plt.close()
        
        # Residuals Plot
        residuals = y_test - y_pred
        plt.figure(figsize=(10, 6))
        plt.scatter(y_pred, residuals, alpha=0.5)
        plt.xlabel('Predicted Final Score')
        plt.ylabel('Residuals')
        plt.title('Residuals vs Predicted Values')
        plt.axhline(y=0, color='r', linestyle='--')
        plt.tight_layout()
        plt.savefig('plots/residuals.png')
        plt.close()
        
        # Distribution Plot
        plt.figure(figsize=(10, 6))
        plt.hist(residuals, bins=20, alpha=0.5, color='b')
        plt.xlabel('Residual Value')
        plt.ylabel('Count')
        plt.title('Distribution of Residuals')
        plt.tight_layout()
        plt.savefig('plots/residuals_distribution.png')
        plt.close()
        
        print("Visualizations saved in 'plots' directory")

    def visualize_feature_importance(self):
        """Create feature importance visualization"""
        print("\n=== FEATURE IMPORTANCE ANALYSIS ===")
        
        # Get feature importance
        X, y = self.prepare_features()
        self.model.fit(X, y)
        
        feature_importance = pd.DataFrame({
            'feature': X.columns,
            'importance': abs(self.model.coef_)
        })
        feature_importance = feature_importance.sort_values('importance', ascending=True)
        
        # Plot feature importance
        plt.figure(figsize=(12, 8))
        plt.barh(feature_importance['feature'], feature_importance['importance'])
        plt.xlabel('Absolute Coefficient Value')
        plt.title('Feature Importance in Predicting Final Score')
        plt.tight_layout()
        plt.savefig('plots/feature_importance_detailed.png')
        plt.close()
        
        print("\nTop 5 Most Important Features:")
        top_features = feature_importance.tail(5)
        for _, row in top_features.iterrows():
            print(f"• {row['feature']}: {row['importance']:.4f}")

    def make_prediction(self, student_features):
        """Make a prediction for a new student"""
        if self.model is None:
            print("Model not trained yet. Training now...")
            self.train_model()
        
        # Prepare features
        student_df = pd.DataFrame([student_features])
        
        # Encode categorical variables
        for col in student_df.select_dtypes(include=['object']).columns:
            if col in self.label_encoders:
                student_df[col] = self.label_encoders[col].transform(student_df[col])
        
        # Scale features
        student_scaled = self.scaler.transform(student_df)
        
        # Make prediction
        prediction = self.model.predict(student_scaled)[0]
        
        return round(prediction, 2)

    def run_complete_analysis(self):
        """Run the complete analysis pipeline"""
        print("============================================================")
        print("STUDENT SCORE PREDICTION ANALYSIS")
        print("============================================================")
        
        try:
            # Load and explore data
            self.load_data()
            self.explore_data()
            
            # Clean and prepare data
            self.clean_data()
            
            # Create visualizations
            self.visualize_predictions()
            self.visualize_feature_importance()
            
            print("\n✅ Analysis completed successfully!")
            print("Check the 'plots' directory for visualizations.")
            
        except Exception as e:
            print(f"\n❌ Error during analysis: {str(e)}")
            print("Please check the error details above and try again.")

def main():
    """Main function to run the analysis"""
    
    # Initialize the predictor
    predictor = StudentScorePredictor('StudentPerformanceFactors.csv')
    
    # Run complete analysis
    predictor.run_complete_analysis()
    
    # Example: Make a prediction for a new student
    print("\n" + "=" * 60)
    print("EXAMPLE PREDICTION")
    print("=" * 60)
    
    # Sample student features (you can modify these)
    sample_student = {
        'Hours_Studied': 25,
        'Attendance': 90,
        'Parental_Involvement': 'Medium',
        'Access_to_Resources': 'High',
        'Extracurricular_Activities': 'Yes',
        'Sleep_Hours': 8,
        'Previous_Scores': 85,
        'Motivation_Level': 'High',
        'Internet_Access': 'Yes',
        'Tutoring_Sessions': 2,
        'Family_Income': 'Medium',
        'Teacher_Quality': 'High',
        'School_Type': 'Public',
        'Peer_Influence': 'Positive',
        'Physical_Activity': 4,
        'Learning_Disabilities': 'No',
        'Parental_Education_Level': 'College',
        'Distance_from_Home': 'Near',
        'Gender': 'Female'
    }
    
    predicted_score = predictor.make_prediction(sample_student)
    
    if predicted_score is not None:
        print(f"\nSample Student Features:")
        for feature, value in sample_student.items():
            print(f"  {feature}: {value}")
        print(f"\nPredicted Exam Score: {predicted_score:.2f}")
        
        # Provide interpretation
        if predicted_score >= 80:
            performance = "Excellent"
        elif predicted_score >= 70:
            performance = "Good"
        elif predicted_score >= 60:
            performance = "Average"
        else:
            performance = "Below Average"
        
        print(f"Performance Level: {performance}")

if __name__ == "__main__":
    main() 