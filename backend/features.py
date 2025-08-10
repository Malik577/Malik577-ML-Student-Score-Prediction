"""
Feature selection and engineering functions.
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from typing import List


def select_features(df: pd.DataFrame, features: List[str]) -> pd.DataFrame:
    """
    Select specified features from DataFrame.
    
    Args:
        df: Input DataFrame
        features: List of feature column names to select
        
    Returns:
        DataFrame with only selected features
    """
    missing_features = [f for f in features if f not in df.columns]
    if missing_features:
        raise ValueError(f"Features not found in dataset: {missing_features}")
    
    return df[features]


def build_poly(X: np.ndarray, degree: int) -> np.ndarray:
    """
    Build polynomial features from input features.
    
    Args:
        X: Input feature matrix
        degree: Polynomial degree
        
    Returns:
        Polynomial feature matrix
    """
    if degree < 2:
        raise ValueError("Polynomial degree must be at least 2")
    
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    X_poly = poly.fit_transform(X)
    
    print(f"Original features: {X.shape[1]}")
    print(f"Polynomial features (degree {degree}): {X_poly.shape[1]}")
    
    return X_poly


def get_feature_names(features: List[str], degree: int) -> List[str]:
    """
    Generate polynomial feature names.
    
    Args:
        features: Original feature names
        degree: Polynomial degree
        
    Returns:
        List of polynomial feature names
    """
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    # Create dummy data to get feature names
    dummy_data = np.ones((1, len(features)))
    poly.fit_transform(dummy_data)
    
    return poly.get_feature_names_out(features).tolist()