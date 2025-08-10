"""
Data loading, cleaning, and splitting functionality.
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from typing import List, Tuple
import os

from .config import DEMO_DATA_PATH, DEFAULT_DATA_PATH
from .utils import file_exists


def maybe_create_demo_csv(path_demo: str) -> None:
    """
    Create synthetic demo dataset if it doesn't exist.
    
    Args:
        path_demo: Path where demo CSV should be created
    """
    if file_exists(path_demo):
        return
    
    print(f"Creating demo dataset at {path_demo}...")
    
    # Create synthetic but realistic data
    np.random.seed(42)
    n_samples = 120
    
    # Generate correlated features
    study_hours = np.random.normal(5.5, 2.0, n_samples).clip(1, 12)
    sleep_hours = np.random.normal(7.0, 1.2, n_samples).clip(4, 10)
    attendance = np.random.normal(85, 12, n_samples).clip(60, 100)
    participation = np.random.uniform(0.4, 1.0, n_samples)
    
    # Create realistic final scores with correlation to study_hours
    base_score = 45
    study_effect = study_hours * 7.5
    sleep_effect = (sleep_hours - 7) * 2  # optimal around 7 hours
    attendance_effect = (attendance - 80) * 0.3
    participation_effect = participation * 15
    noise = np.random.normal(0, 8, n_samples)
    
    final_score = (base_score + study_effect + sleep_effect + 
                  attendance_effect + participation_effect + noise).clip(0, 100)
    
    # Create DataFrame
    data = {
        'Study Hours': study_hours,
        'Sleep Hours': sleep_hours,
        'Attendance': attendance,
        'Participation': participation,
        'Final Score': final_score
    }
    
    df = pd.DataFrame(data)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(path_demo), exist_ok=True)
    
    # Save to CSV
    df.to_csv(path_demo, index=False)
    print(f"Demo dataset created with {len(df)} samples")


def resolve_data_path(env_or_default: str, path_demo: str) -> str:
    """
    Resolve which data path to use, creating demo if needed.
    
    Args:
        env_or_default: Path from environment or default
        path_demo: Path to demo dataset
        
    Returns:
        Resolved data path
    """
    # First try the environment/default path
    if file_exists(env_or_default):
        print(f"Using dataset: {env_or_default}")
        return env_or_default
    
    # Try the default location
    if file_exists(DEFAULT_DATA_PATH):
        print(f"Using dataset: {DEFAULT_DATA_PATH}")
        return DEFAULT_DATA_PATH
    
    # Create and use demo dataset
    maybe_create_demo_csv(path_demo)
    print(f"Using demo dataset: {path_demo}")
    return path_demo


def load_data(path: str) -> pd.DataFrame:
    """
    Load dataset from CSV file with basic preprocessing.
    
    Args:
        path: Path to CSV file
        
    Returns:
        Loaded and preprocessed DataFrame
    """
    try:
        df = pd.read_csv(path)
    except FileNotFoundError:
        raise FileNotFoundError(f"Dataset not found at {path}")
    
    # Normalize column names: strip whitespace, lowercase, replace spaces with underscores
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
    
    # Convert numeric columns, coercing errors to NaN
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    for col in df.columns:
        if col not in numeric_columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    print(f"Loaded dataset: {df.shape[0]} rows, {df.shape[1]} columns")
    return df


def clean_data(df: pd.DataFrame, target: str, features: List[str]) -> pd.DataFrame:
    """
    Clean dataset by removing rows with missing target or all missing features.
    
    Args:
        df: Input DataFrame
        target: Target column name
        features: List of feature column names
        
    Returns:
        Cleaned DataFrame
    """
    # Check if columns exist
    missing_cols = [col for col in [target] + features if col not in df.columns]
    if missing_cols:
        available_cols = list(df.columns)
        raise ValueError(
            f"Missing columns: {missing_cols}. Available columns: {available_cols}"
        )
    
    # Remove rows where target is missing
    df_clean = df.dropna(subset=[target]).copy()
    
    # Remove rows where all features are missing
    df_clean = df_clean.dropna(subset=features, how='all')
    
    print(f"Dataset shape after cleaning: {df_clean.shape}")
    print(f"Removed {len(df) - len(df_clean)} rows with missing data")
    
    return df_clean


def split_data(
    df: pd.DataFrame, 
    features: List[str], 
    target: str, 
    test_size: float = 0.2, 
    random_state: int = 42
) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    """
    Split data into training and testing sets.
    
    Args:
        df: Input DataFrame
        features: List of feature column names
        target: Target column name
        test_size: Proportion of data for testing
        random_state: Random seed for reproducibility
        
    Returns:
        Tuple of (X_train, X_test, y_train, y_test)
    """
    X = df[features].values
    y = df[target].values
    
    # Handle missing values by using mean imputation for features
    if np.isnan(X).any():
        print("Warning: Missing values found in features. Using mean imputation.")
        from sklearn.impute import SimpleImputer
        imputer = SimpleImputer(strategy='mean')
        X = imputer.fit_transform(X)
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    print(f"Training set size: {len(X_train)}")
    print(f"Test set size: {len(X_test)}")
    
    return X_train, X_test, y_train, y_test