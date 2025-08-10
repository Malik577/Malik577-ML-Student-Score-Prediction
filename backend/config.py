"""
Configuration constants and default values for the student score prediction project.
"""
import os
from typing import List

# Data paths
DEFAULT_DATA_PATH = "data/student_performance.csv"
DEMO_DATA_PATH = "data/student_performance_demo.csv"
DATA_PATH = os.getenv("DATA_PATH", DEFAULT_DATA_PATH)

# Model configuration
RANDOM_STATE = 42
TEST_SIZE = 0.2

# Default features and target
DEFAULT_FEATURES = [
    "study_hours", "attendance", "previous_scores", "tutoring_sessions",
    "sleep_hours", "physical_activity"
]
DEFAULT_TARGET = "final_score"

# Polynomial regression configuration
POLY_DEGREES = [2, 3, 4, 5]
CV_FOLDS = 5

# Output paths
OUTPUT_DIR = "outputs"
MODELS_DIR = os.path.join(OUTPUT_DIR, "models")
FIGURES_DIR = os.path.join(OUTPUT_DIR, "figures")
METRICS_DIR = OUTPUT_DIR

# Plotting configuration
FIGURE_SIZE = (10, 6)
DPI = 150