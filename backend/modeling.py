"""
Machine learning modeling functions and CLI for student score prediction.
"""
import argparse
import json
import os
import sys
import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from typing import Dict, List, Tuple, Any
import warnings
warnings.filterwarnings('ignore')

from .config import *
from .data import resolve_data_path, load_data, clean_data, split_data
from .features import select_features, build_poly
from .plots import histograms, scatter_xy, pred_vs_actual, residuals, metrics_comparison
from .utils import save_json, ensure_dirs, print_metrics, load_env_path


def train_linear(X_train: np.ndarray, y_train: np.ndarray) -> LinearRegression:
    """
    Train linear regression model.
    
    Args:
        X_train: Training features
        y_train: Training targets
        
    Returns:
        Fitted LinearRegression model
    """
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model


def train_poly(X_train: np.ndarray, y_train: np.ndarray, degree: int) -> LinearRegression:
    """
    Train polynomial regression model.
    
    Args:
        X_train: Training features
        y_train: Training targets
        degree: Polynomial degree
        
    Returns:
        Fitted LinearRegression model on polynomial features
    """
    X_poly = build_poly(X_train, degree)
    model = LinearRegression()
    model.fit(X_poly, y_train)
    return model


def predict(model: LinearRegression, X_test: np.ndarray) -> np.ndarray:
    """
    Make predictions using trained model.
    
    Args:
        model: Trained model
        X_test: Test features
        
    Returns:
        Predictions
    """
    return model.predict(X_test)


def compute_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    """
    Compute regression metrics.
    
    Args:
        y_true: True values
        y_pred: Predicted values
        
    Returns:
        Dictionary of metrics
    """
    return {
        'mae': mean_absolute_error(y_true, y_pred),
        'mse': mean_squared_error(y_true, y_pred),
        'rmse': np.sqrt(mean_squared_error(y_true, y_pred)),
        'r2': r2_score(y_true, y_pred)
    }


def cv_select_poly_degree(
    X: np.ndarray, 
    y: np.ndarray, 
    degrees: List[int] = None, 
    k: int = 5, 
    random_state: int = 42
) -> Dict[str, Any]:
    """
    Select best polynomial degree using cross-validation.
    
    Args:
        X: Feature matrix
        y: Target vector
        degrees: List of degrees to test
        k: Number of CV folds
        random_state: Random seed
        
    Returns:
        Dictionary with best degree and CV results
    """
    if degrees is None:
        degrees = POLY_DEGREES
    
    cv_results = {}
    
    for degree in degrees:
        X_poly = build_poly(X, degree)
        model = LinearRegression()
        
        # Use negative RMSE for cross_val_score (higher is better)
        scores = cross_val_score(model, X_poly, y, cv=k, 
                               scoring='neg_root_mean_squared_error', 
                               random_state=random_state)
        
        # Convert back to positive RMSE
        rmse_scores = -scores
        cv_results[degree] = {
            'mean_rmse': rmse_scores.mean(),
            'std_rmse': rmse_scores.std(),
            'scores': rmse_scores.tolist()
        }
    
    # Find best degree (lowest mean RMSE)
    best_degree = min(cv_results.keys(), key=lambda d: cv_results[d]['mean_rmse'])
    
    return {
        'best_degree': best_degree,
        'cv_results': cv_results
    }


def main():
    """Main CLI interface."""
    parser = argparse.ArgumentParser(description='Student Score Prediction Modeling')
    
    # Data arguments
    parser.add_argument('--data-path', type=str, 
                       default=load_env_path('DATA_PATH', DEFAULT_DATA_PATH),
                       help='Path to CSV data file')
    parser.add_argument('--target', type=str, default=DEFAULT_TARGET,
                       help='Target column name')
    parser.add_argument('--features', type=str, default=','.join(DEFAULT_FEATURES),
                       help='Comma-separated feature column names')
    
    # Model arguments
    parser.add_argument('--model', type=str, choices=['linear', 'poly'], required=True,
                       help='Model type to train')
    parser.add_argument('--degree', type=str, default='auto',
                       help='Polynomial degree (int) or "auto" for CV selection')
    
    # Training arguments
    parser.add_argument('--test-size', type=float, default=TEST_SIZE,
                       help='Test set proportion')
    parser.add_argument('--random-state', type=int, default=RANDOM_STATE,
                       help='Random seed')
    
    # Output arguments
    parser.add_argument('--save-model', action='store_true',
                       help='Save trained model')
    parser.add_argument('--make-plots', action='store_true',
                       help='Generate and save plots')
    parser.add_argument('--no-train', action='store_true',
                       help='Only run EDA plots, skip training')
    
    args = parser.parse_args()
    
    # Parse features
    features = [f.strip() for f in args.features.split(',')]
    
    print("="*60)
    print("STUDENT SCORE PREDICTION")
    print("="*60)
    print(f"Model: {args.model}")
    print(f"Features: {features}")
    print(f"Target: {args.target}")
    
    # Ensure output directories exist
    ensure_dirs(MODELS_DIR, FIGURES_DIR, METRICS_DIR)
    
    # Resolve data path (create demo if needed)
    data_path = resolve_data_path(args.data_path, DEMO_DATA_PATH)
    print(f"Data path: {data_path}")
    
    # Load and prepare data
    print("\nLoading and cleaning data...")
    try:
        df = load_data(data_path)
        df_clean = clean_data(df, args.target, features)
        
        # Generate EDA plots if requested
        if args.make_plots:
            print("\nGenerating EDA plots...")
            
            # Histograms
            plot_columns = features + [args.target]
            available_columns = [col for col in plot_columns if col in df_clean.columns]
            if available_columns:
                histograms(df_clean, available_columns, 
                          os.path.join(FIGURES_DIR, "eda"))
            
            # Scatter plot (first feature vs target)
            if len(features) > 0 and features[0] in df_clean.columns:
                scatter_xy(df_clean[features[0]].values, df_clean[args.target].values,
                          os.path.join(FIGURES_DIR, f"{features[0]}_vs_{args.target}.png"),
                          features[0].replace('_', ' ').title(),
                          args.target.replace('_', ' ').title(),
                          f"{features[0]} vs {args.target}")
        
        # If no-train flag, exit after EDA
        if args.no_train:
            print("\nEDA complete. Exiting (--no-train flag set).")
            sys.exit(0)
        
        # Split data
        X_train, X_test, y_train, y_test = split_data(
            df_clean, features, args.target, 
            test_size=args.test_size, 
            random_state=args.random_state
        )
        
    except Exception as e:
        print(f"Error loading/processing data: {e}")
        sys.exit(1)
    
    # Train model
    print(f"\nTraining {args.model} model...")
    
    if args.model == 'linear':
        model = train_linear(X_train, y_train)
        y_pred = predict(model, X_test)
        
        metrics = compute_metrics(y_test, y_pred)
        print_metrics(metrics, "Linear Regression Results")
        
        # Save outputs
        model_path = os.path.join(MODELS_DIR, "linear_model.pkl")
        metrics_path = os.path.join(METRICS_DIR, "metrics_linear.json")
        
        if args.save_model:
            joblib.dump(model, model_path)
            print(f"Model saved to {model_path}")
        
        save_json(metrics_path, metrics)
        print(f"Metrics saved to {metrics_path}")
        
        if args.make_plots:
            pred_vs_actual(y_test, y_pred, 
                          os.path.join(FIGURES_DIR, "pred_vs_actual_linear.png"),
                          "Linear Regression: Predictions vs Actual")
            residuals(y_test, y_pred,
                     os.path.join(FIGURES_DIR, "residuals_linear.png"),
                     "Linear Regression: Residual Plot")
    
    elif args.model == 'poly':
        # Determine degree
        if args.degree == 'auto':
            print("Selecting optimal polynomial degree using cross-validation...")
            cv_result = cv_select_poly_degree(X_train, y_train, 
                                            random_state=args.random_state)
            best_degree = cv_result['best_degree']
            print(f"Best degree selected: {best_degree}")
            print("CV Results:")
            for deg, result in cv_result['cv_results'].items():
                print(f"  Degree {deg}: RMSE = {result['mean_rmse']:.4f} ± {result['std_rmse']:.4f}")
        else:
            best_degree = int(args.degree)
            cv_result = None
            print(f"Using polynomial degree: {best_degree}")
        
        # Train polynomial model
        X_train_poly = build_poly(X_train, best_degree)
        X_test_poly = build_poly(X_test, best_degree)
        
        model = train_linear(X_train_poly, y_train)  # Linear on poly features
        y_pred = predict(model, X_test_poly)
        
        metrics = compute_metrics(y_test, y_pred)
        metrics['degree'] = best_degree
        if cv_result:
            metrics['cv_results'] = cv_result['cv_results']
        
        print_metrics(metrics, f"Polynomial Regression Results (degree={best_degree})")
        
        # Save outputs
        model_path = os.path.join(MODELS_DIR, f"poly_degree_{best_degree}.pkl")
        if args.degree == 'auto':
            model_path = os.path.join(MODELS_DIR, "poly_best.pkl")
        
        metrics_path = os.path.join(METRICS_DIR, "metrics_poly.json")
        
        if args.save_model:
            # Save both the model and the degree for proper prediction
            model_data = {'model': model, 'degree': best_degree}
            joblib.dump(model_data, model_path)
            print(f"Model saved to {model_path}")
        
        save_json(metrics_path, metrics)
        print(f"Metrics saved to {metrics_path}")
        
        if args.make_plots:
            pred_vs_actual(y_test, y_pred,
                          os.path.join(FIGURES_DIR, f"pred_vs_actual_poly_deg_{best_degree}.png"),
                          f"Polynomial Regression (degree={best_degree}): Predictions vs Actual")
            residuals(y_test, y_pred,
                     os.path.join(FIGURES_DIR, f"residuals_poly_deg_{best_degree}.png"),
                     f"Polynomial Regression (degree={best_degree}): Residual Plot")
            
            # Compare with linear if linear results exist
            linear_metrics_path = os.path.join(METRICS_DIR, "metrics_linear.json")
            if os.path.exists(linear_metrics_path):
                try:
                    with open(linear_metrics_path, 'r') as f:
                        linear_metrics = json.load(f)
                    metrics_comparison(linear_metrics, metrics,
                                     os.path.join(FIGURES_DIR, "metrics_comparison_bar.png"))
                except Exception as e:
                    print(f"Warning: Could not generate comparison plot: {e}")
    
    print("\n" + "="*60)
    print("ANALYSIS COMPLETE")
    print("="*60)


if __name__ == "__main__":
    main()