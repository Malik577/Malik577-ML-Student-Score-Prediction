"""
Plotting functions using matplotlib for visualizations.
"""
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from typing import List, Dict, Optional
import os


def histograms(
    df: pd.DataFrame, 
    columns: List[str], 
    out_path_prefix: str, 
    bins: int = 20,
    title: str = "Feature Distributions"
) -> None:
    """
    Create histogram plots for specified columns.
    
    Args:
        df: Input DataFrame
        columns: List of column names to plot
        out_path_prefix: Output file path prefix
        bins: Number of histogram bins
        title: Plot title
    """
    n_cols = min(3, len(columns))
    n_rows = (len(columns) + n_cols - 1) // n_cols
    
    fig, axes = plt.subplots(n_rows, n_cols, figsize=(4 * n_cols, 4 * n_rows))
    fig.suptitle(title, fontsize=16)
    
    if n_rows == 1 and n_cols == 1:
        axes = [axes]
    elif n_rows == 1:
        axes = axes
    else:
        axes = axes.flatten()
    
    for i, col in enumerate(columns):
        if col in df.columns:
            axes[i].hist(df[col].dropna(), bins=bins, alpha=0.7, edgecolor='black')
            axes[i].set_title(f'{col.replace("_", " ").title()}')
            axes[i].set_xlabel('Value')
            axes[i].set_ylabel('Frequency')
        else:
            axes[i].text(0.5, 0.5, f'Column\n{col}\nnot found', 
                        ha='center', va='center', transform=axes[i].transAxes)
            axes[i].set_title(f'{col} (Missing)')
    
    # Hide empty subplots
    for i in range(len(columns), len(axes)):
        axes[i].set_visible(False)
    
    plt.tight_layout()
    out_path = f"{out_path_prefix}_histograms.png"
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    plt.savefig(out_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved histogram plot to {out_path}")


def scatter_xy(
    x: np.ndarray, 
    y: np.ndarray, 
    out_path: str, 
    xlabel: str, 
    ylabel: str, 
    title: str
) -> None:
    """
    Create scatter plot of x vs y.
    
    Args:
        x: X-axis values
        y: Y-axis values
        out_path: Output file path
        xlabel: X-axis label
        ylabel: Y-axis label
        title: Plot title
    """
    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, alpha=0.6, edgecolors='black', linewidth=0.5)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title(title)
    plt.grid(True, alpha=0.3)
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    plt.savefig(out_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved scatter plot to {out_path}")


def pred_vs_actual(
    y_true: np.ndarray, 
    y_pred: np.ndarray, 
    out_path: str, 
    title: str = "Predictions vs Actual"
) -> None:
    """
    Create predictions vs actual values plot.
    
    Args:
        y_true: True values
        y_pred: Predicted values
        out_path: Output file path
        title: Plot title
    """
    plt.figure(figsize=(10, 8))
    plt.scatter(y_true, y_pred, alpha=0.6, edgecolors='black', linewidth=0.5)
    
    # Add perfect prediction line
    min_val = min(y_true.min(), y_pred.min())
    max_val = max(y_true.max(), y_pred.max())
    plt.plot([min_val, max_val], [min_val, max_val], 'r--', lw=2, label='Perfect Prediction')
    
    plt.xlabel('Actual Values')
    plt.ylabel('Predicted Values')
    plt.title(title)
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    plt.savefig(out_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved predictions vs actual plot to {out_path}")


def residuals(
    y_true: np.ndarray, 
    y_pred: np.ndarray, 
    out_path: str, 
    title: str = "Residual Plot"
) -> None:
    """
    Create residual plot.
    
    Args:
        y_true: True values
        y_pred: Predicted values
        out_path: Output file path
        title: Plot title
    """
    residuals_vals = y_true - y_pred
    
    plt.figure(figsize=(10, 6))
    plt.scatter(y_pred, residuals_vals, alpha=0.6, edgecolors='black', linewidth=0.5)
    plt.axhline(y=0, color='r', linestyle='--', lw=2)
    plt.xlabel('Predicted Values')
    plt.ylabel('Residuals')
    plt.title(title)
    plt.grid(True, alpha=0.3)
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    plt.savefig(out_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved residual plot to {out_path}")


def metrics_comparison(
    metrics_linear: Dict[str, float], 
    metrics_poly: Dict[str, float], 
    out_path: str,
    title: str = "Model Comparison"
) -> None:
    """
    Create bar chart comparing metrics between linear and polynomial models.
    
    Args:
        metrics_linear: Linear model metrics
        metrics_poly: Polynomial model metrics
        out_path: Output file path
        title: Plot title
    """
    metrics = ['mae', 'mse', 'rmse', 'r2']
    linear_values = [metrics_linear.get(m, 0) for m in metrics]
    poly_values = [metrics_poly.get(m, 0) for m in metrics]
    
    x = np.arange(len(metrics))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 6))
    bars1 = ax.bar(x - width/2, linear_values, width, label='Linear', alpha=0.8)
    bars2 = ax.bar(x + width/2, poly_values, width, label='Polynomial', alpha=0.8)
    
    ax.set_xlabel('Metrics')
    ax.set_ylabel('Values')
    ax.set_title(title)
    ax.set_xticks(x)
    ax.set_xticklabels([m.upper() for m in metrics])
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    # Add value labels on bars
    def add_value_labels(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.3f}',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3),  # 3 points vertical offset
                       textcoords="offset points",
                       ha='center', va='bottom', fontsize=9)
    
    add_value_labels(bars1)
    add_value_labels(bars2)
    
    plt.tight_layout()
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    plt.savefig(out_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved metrics comparison plot to {out_path}")