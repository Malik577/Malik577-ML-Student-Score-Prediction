# Student Score Prediction Project

## Overview
This project implements a machine learning model to predict students' exam scores based on various factors including study hours, attendance, parental involvement, and other performance indicators.

## Project Structure
```
├── StudentPerformanceFactors.csv    # Dataset with student performance factors
├── notebooks/
│   ├── student_score_prediction.py  # Python script version
│   └── student_score_prediction.ipynb  # Jupyter notebook version
├── requirements.txt                  # Python dependencies
└── README_student_prediction.md     # This file
```

## Features
- **Data Cleaning**: Handles missing values and encodes categorical variables
- **Exploratory Data Analysis**: Comprehensive visualizations of the dataset
- **Feature Engineering**: Prepares features for machine learning
- **Model Training**: Linear regression model for score prediction
- **Model Evaluation**: Multiple evaluation metrics (MSE, RMSE, MAE, R²)
- **Visualization**: Model performance and feature importance plots
- **Prediction Interface**: Easy-to-use function for new student predictions

## Requirements
- Python 3.7+
- Required packages (see requirements.txt):
  - pandas >= 1.5.0
  - numpy >= 1.21.0
  - matplotlib >= 3.5.0
  - seaborn >= 0.11.0
  - scikit-learn >= 1.1.0
  - jupyter >= 1.0.0

## Installation
1. Clone or download the project files
2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Option 1: Python Script
Run the complete analysis:
```bash
python notebooks/student_score_prediction.py
```

### Option 2: Jupyter Notebook
1. Start Jupyter:
   ```bash
   jupyter notebook
   ```
2. Open `notebooks/student_score_prediction.ipynb`
3. Run cells sequentially

## Dataset Description
The `StudentPerformanceFactors.csv` contains 6,609 student records with 20 features:

**Numerical Features:**
- Hours_Studied: Number of hours studied
- Attendance: Attendance percentage
- Sleep_Hours: Hours of sleep
- Previous_Scores: Previous academic scores
- Tutoring_Sessions: Number of tutoring sessions
- Physical_Activity: Physical activity level
- Exam_Score: Target variable (exam score)

**Categorical Features:**
- Parental_Involvement: Low/Medium/High
- Access_to_Resources: Low/Medium/High
- Extracurricular_Activities: Yes/No
- Motivation_Level: Low/Medium/High
- Internet_Access: Yes/No
- Family_Income: Low/Medium/High
- Teacher_Quality: Low/Medium/High
- School_Type: Public/Private
- Peer_Influence: Positive/Negative/Neutral
- Learning_Disabilities: Yes/No
- Parental_Education_Level: High School/College/Postgraduate
- Distance_from_Home: Near/Moderate/Far
- Gender: Male/Female

## Model Performance
The linear regression model typically achieves:
- **R² Score**: 0.7-0.8 (explains 70-80% of variance)
- **RMSE**: 5-7 points (average prediction error)
- **MAE**: 4-6 points (mean absolute error)

## Key Insights
1. **Study Hours**: Strongest positive correlation with exam scores
2. **Previous Scores**: High correlation with current performance
3. **Attendance**: Important factor for academic success
4. **Parental Involvement**: Significant impact on student performance
5. **Teacher Quality**: Affects learning outcomes

## Making Predictions
You can predict scores for new students by providing their features:

```python
# Example student
student_features = {
    'Hours_Studied': 25,
    'Attendance': 90,
    'Parental_Involvement': 'Medium',
    # ... other features
}

predicted_score = predictor.make_prediction(student_features)
```

## Output Files
The analysis generates several visualization files:
- `student_performance_analysis.png`: Data exploration plots
- `model_performance_analysis.png`: Model evaluation plots
- `feature_importance.png`: Feature importance visualization

## Customization
- Modify the `sample_student` dictionary to test different scenarios
- Adjust the train/test split ratio in the `prepare_features()` method
- Add new evaluation metrics in the `evaluate_model()` method
- Customize visualizations by modifying plot parameters

## Future Improvements
- Implement other regression algorithms (Random Forest, XGBoost)
- Add cross-validation for more robust evaluation
- Create a web interface for easy predictions
- Include feature selection techniques
- Add model interpretability tools

## Troubleshooting
- **Import Errors**: Ensure all packages are installed correctly
- **File Not Found**: Check that the CSV file is in the correct location
- **Memory Issues**: For large datasets, consider using data sampling
- **Plot Display**: In some environments, use `plt.show()` to display plots

## License
This project is for educational purposes. Feel free to modify and use as needed.

## Contact
For questions or improvements, please refer to the project documentation or create an issue in the repository. 