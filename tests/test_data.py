"""
Tests for data loading and processing functions.
"""
import pytest
import pandas as pd
import numpy as np
from src.data import load_data, clean_data, split_data, maybe_create_demo_csv, resolve_data_path
import tempfile
import os


def create_test_csv():
    """Create a temporary test CSV file."""
    data = {
        'Study Hours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'Sleep Hours': [7, 8, 6, 7, 8, 9, 6, 7, 8, 9],
        'Final Score': [60, 65, 70, 75, 80, 85, 90, 95, 98, 100],
        'Attendance': [80, 85, 90, 95, 88, 92, 96, 98, 99, 100]
    }
    df = pd.DataFrame(data)
    
    # Create temporary file
    temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False)
    df.to_csv(temp_file.name, index=False)
    temp_file.close()
    
    return temp_file.name


def test_load_data():
    """Test data loading and column normalization."""
    csv_path = create_test_csv()
    
    try:
        df = load_data(csv_path)
        
        # Check that columns are normalized
        expected_columns = ['study_hours', 'sleep_hours', 'final_score', 'attendance']
        assert list(df.columns) == expected_columns
        
        # Check data types
        assert df['study_hours'].dtype in [np.int64, np.float64]
        assert len(df) == 10
        
    finally:
        os.unlink(csv_path)


def test_clean_data():
    """Test data cleaning functionality."""
    # Create test data with missing values
    data = {
        'study_hours': [1, 2, np.nan, 4, 5],
        'sleep_hours': [7, np.nan, 6, 7, 8],
        'final_score': [60, 65, np.nan, 75, 80],
        'attendance': [80, 85, 90, np.nan, 88]
    }
    df = pd.DataFrame(data)
    
    # Clean data
    features = ['study_hours', 'sleep_hours']
    target = 'final_score'
    
    df_clean = clean_data(df, target, features)
    
    # Should remove rows where target is missing
    assert len(df_clean) == 4  # Removed row with missing final_score
    
    # Should not have any missing targets
    assert df_clean[target].isna().sum() == 0


def test_split_data():
    """Test train/test splitting."""
    # Create simple test data
    data = {
        'study_hours': range(1, 21),
        'final_score': [x * 10 + 50 for x in range(1, 21)]
    }
    df = pd.DataFrame(data)
    
    features = ['study_hours']
    target = 'final_score'
    
    X_train, X_test, y_train, y_test = split_data(
        df, features, target, test_size=0.2, random_state=42
    )
    
    # Check shapes
    assert len(X_train) == 16  # 80% of 20
    assert len(X_test) == 4    # 20% of 20
    assert len(y_train) == 16
    assert len(y_test) == 4
    
    # Check feature dimensions
    assert X_train.shape[1] == 1  # Only study_hours
    assert X_test.shape[1] == 1


def test_missing_columns_error():
    """Test error handling for missing columns."""
    data = {
        'study_hours': [1, 2, 3],
        'final_score': [60, 65, 70]
    }
    df = pd.DataFrame(data)
    
    # Try to use non-existent feature
    with pytest.raises(ValueError, match="Missing columns"):
        clean_data(df, 'final_score', ['nonexistent_feature'])
    
    # Try to use non-existent target
    with pytest.raises(ValueError, match="Missing columns"):
        clean_data(df, 'nonexistent_target', ['study_hours'])


def test_maybe_create_demo_csv():
    """Test demo CSV creation."""
    with tempfile.TemporaryDirectory() as temp_dir:
        demo_path = os.path.join(temp_dir, 'demo.csv')
        
        # Should create file if it doesn't exist
        maybe_create_demo_csv(demo_path)
        assert os.path.exists(demo_path)
        
        # Should load successfully
        df = pd.read_csv(demo_path)
        assert len(df) == 120
        assert 'Study Hours' in df.columns
        assert 'Final Score' in df.columns


def test_resolve_data_path():
    """Test data path resolution logic."""
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create demo path
        demo_path = os.path.join(temp_dir, 'demo.csv')
        
        # Non-existent primary path should resolve to demo
        nonexistent_path = os.path.join(temp_dir, 'nonexistent.csv')
        resolved = resolve_data_path(nonexistent_path, demo_path)
        
        assert resolved == demo_path
        assert os.path.exists(demo_path)  # Should be created