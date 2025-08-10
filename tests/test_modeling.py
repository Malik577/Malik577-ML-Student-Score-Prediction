"""
Tests for modeling functions.
"""
import pytest
import numpy as np
import pandas as pd
import tempfile
import os
import json
from sklearn.metrics import r2_score
from src.modeling import (
    train_linear, train_poly, predict, compute_metrics, 
    cv_select_poly_degree
)


def create_linear_data(n_samples=100, noise=0.1, random_state=42):
    """Create synthetic linear data for testing."""
    np.random.seed(random_state)
    X = np.random.uniform(1, 10, (n_samples, 1))
    y = 2 * X.flatten() + 3 + np.random.normal(0, noise, n_samples)
    return X, y


def create_quadratic_data(n_samples=100, noise=0.1, random_state=42):
    """Create synthetic quadratic data for testing."""
    np.random.seed(random_state)
    X = np.random.uniform(1, 5, (n_samples, 1))
    y = 2 * X.flatten()**2 + 3 * X.flatten() + 1 + np.random.normal(0, noise, n_samples)
    return X, y


def test_train_linear():
    """Test linear regression training."""
    X, y = create_linear_data()
    
    model = train_linear(X, y)
    
    # Should be a trained model
    assert hasattr(model, 'coef_')
    assert hasattr(model, 'intercept_')
    
    # Should make reasonable predictions
    y_pred = predict(model, X)
    r2 = r2_score(y, y_pred)
    assert r2 > 0.8  # Should fit well on linear data


def test_train_poly():
    """Test polynomial regression training."""
    X, y = create_quadratic_data()
    
    model = train_poly(X, y, degree=2)
    
    # Should be a trained model
    assert hasattr(model, 'coef_')
    assert hasattr(model, 'intercept_')
    
    # For prediction, we need to manually create polynomial features
    from src.features import build_poly
    X_poly = build_poly(X, 2)
    y_pred = predict(model, X_poly)
    r2 = r2_score(y, y_pred)
    assert r2 > 0.8  # Should fit well on quadratic data


def test_compute_metrics():
    """Test metrics computation."""
    y_true = np.array([1, 2, 3, 4, 5])
    y_pred = np.array([1.1, 1.9, 3.1, 3.9, 5.1])
    
    metrics = compute_metrics(y_true, y_pred)
    
    # Check that all metrics are present
    expected_metrics = ['mae', 'mse', 'rmse', 'r2']
    assert all(metric in metrics for metric in expected_metrics)
    
    # Check that metrics are reasonable
    assert metrics['mae'] < 0.5  # Small error
    assert metrics['r2'] > 0.9   # High R-squared
    assert metrics['rmse'] > 0   # Positive RMSE
    assert metrics['mse'] > 0    # Positive MSE


def test_cv_select_poly_degree():
    """Test polynomial degree selection via cross-validation."""
    X, y = create_quadratic_data(n_samples=50)
    
    result = cv_select_poly_degree(X, y, degrees=[2, 3], k=3, random_state=42)
    
    # Check result structure
    assert 'best_degree' in result
    assert 'cv_results' in result
    assert result['best_degree'] in [2, 3]
    
    # Check CV results structure
    cv_results = result['cv_results']
    for degree in [2, 3]:
        assert degree in cv_results
        assert 'mean_rmse' in cv_results[degree]
        assert 'std_rmse' in cv_results[degree]
        assert 'scores' in cv_results[degree]


def test_linear_vs_poly_performance():
    """Test that polynomial improves on quadratic data."""
    X, y = create_quadratic_data(n_samples=100, noise=0.1)
    
    # Split data
    split_idx = 80
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]
    
    # Train linear model
    linear_model = train_linear(X_train, y_train)
    y_pred_linear = predict(linear_model, X_test)
    metrics_linear = compute_metrics(y_test, y_pred_linear)
    
    # Train polynomial model
    from src.features import build_poly
    X_train_poly = build_poly(X_train, 2)
    X_test_poly = build_poly(X_test, 2)
    
    poly_model = train_linear(X_train_poly, y_train)  # Linear on poly features
    y_pred_poly = predict(poly_model, X_test_poly)
    metrics_poly = compute_metrics(y_test, y_pred_poly)
    
    # Polynomial should perform better or equal on quadratic data
    assert metrics_poly['r2'] >= metrics_linear['r2'] - 0.05  # Allow small tolerance


def test_perfect_predictions():
    """Test metrics on perfect predictions."""
    y_true = np.array([1, 2, 3, 4, 5])
    y_pred = y_true.copy()  # Perfect predictions
    
    metrics = compute_metrics(y_true, y_pred)
    
    assert metrics['mae'] == 0.0
    assert metrics['mse'] == 0.0
    assert metrics['rmse'] == 0.0
    assert metrics['r2'] == 1.0


def test_demo_data_performance():
    """Test that models perform reasonably on demo data."""
    # Load demo data
    from src.data import resolve_data_path, load_data, clean_data, split_data
    from src.config import DEMO_DATA_PATH, DEFAULT_DATA_PATH
    
    data_path = resolve_data_path(DEFAULT_DATA_PATH, DEMO_DATA_PATH)
    df = load_data(data_path)
    df_clean = clean_data(df, 'final_score', ['study_hours'])
    
    X_train, X_test, y_train, y_test = split_data(
        df_clean, ['study_hours'], 'final_score', test_size=0.2, random_state=42
    )
    
    # Train linear model
    model = train_linear(X_train, y_train)
    y_pred = predict(model, X_test)
    metrics = compute_metrics(y_test, y_pred)
    
    # Should achieve reasonable performance on synthetic data
    assert metrics['r2'] > 0.5  # At least moderate correlation