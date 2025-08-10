"""
Tests for feature engineering functions.
"""
import pytest
import pandas as pd
import numpy as np
from src.features import select_features, build_poly, get_feature_names


def test_select_features():
    """Test feature selection."""
    data = {
        'study_hours': [1, 2, 3, 4, 5],
        'sleep_hours': [7, 8, 6, 7, 8],
        'final_score': [60, 65, 70, 75, 80],
        'attendance': [80, 85, 90, 95, 88]
    }
    df = pd.DataFrame(data)
    
    # Select subset of features
    selected = select_features(df, ['study_hours', 'sleep_hours'])
    
    assert list(selected.columns) == ['study_hours', 'sleep_hours']
    assert len(selected) == 5


def test_select_features_missing():
    """Test error handling for missing features."""
    data = {
        'study_hours': [1, 2, 3],
        'final_score': [60, 65, 70]
    }
    df = pd.DataFrame(data)
    
    with pytest.raises(ValueError, match="Features not found"):
        select_features(df, ['nonexistent_feature'])


def test_build_poly():
    """Test polynomial feature building."""
    X = np.array([[1], [2], [3], [4], [5]])
    
    # Test degree 2
    X_poly2 = build_poly(X, 2)
    assert X_poly2.shape == (5, 2)  # x and x^2
    
    # Test degree 3
    X_poly3 = build_poly(X, 3)
    assert X_poly3.shape == (5, 3)  # x, x^2, x^3
    
    # Test that polynomial features are correct for degree 2
    expected_first_row = [1, 1]  # x=1, x^2=1
    expected_second_row = [2, 4]  # x=2, x^2=4
    
    np.testing.assert_array_almost_equal(X_poly2[0], expected_first_row)
    np.testing.assert_array_almost_equal(X_poly2[1], expected_second_row)


def test_build_poly_multiple_features():
    """Test polynomial features with multiple input features."""
    X = np.array([
        [1, 2],
        [2, 3],
        [3, 4]
    ])
    
    X_poly2 = build_poly(X, 2)
    # Should have: x1, x2, x1^2, x1*x2, x2^2 = 5 features
    assert X_poly2.shape == (3, 5)


def test_build_poly_invalid_degree():
    """Test error handling for invalid polynomial degree."""
    X = np.array([[1], [2], [3]])
    
    with pytest.raises(ValueError, match="Polynomial degree must be at least 2"):
        build_poly(X, 1)


def test_get_feature_names():
    """Test polynomial feature name generation."""
    features = ['study_hours']
    
    names_deg2 = get_feature_names(features, 2)
    assert len(names_deg2) == 2  # study_hours, study_hours^2
    assert 'study_hours' in names_deg2
    assert 'study_hours^2' in names_deg2
    
    names_deg3 = get_feature_names(features, 3)
    assert len(names_deg3) == 3  # study_hours, study_hours^2, study_hours^3


def test_get_feature_names_multiple():
    """Test polynomial feature names with multiple input features."""
    features = ['study_hours', 'sleep_hours']
    
    names_deg2 = get_feature_names(features, 2)
    # Should have: study_hours, sleep_hours, study_hours^2, study_hours*sleep_hours, sleep_hours^2
    assert len(names_deg2) == 5
    assert 'study_hours' in names_deg2
    assert 'sleep_hours' in names_deg2