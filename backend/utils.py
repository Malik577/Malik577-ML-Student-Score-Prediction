"""
Utility functions for file I/O and general helpers.
"""
import json
import os
from typing import Any, Dict


def ensure_dirs(*paths: str) -> None:
    """
    Create directories if they don't exist.
    
    Args:
        *paths: Directory paths to create
    """
    for path in paths:
        os.makedirs(path, exist_ok=True)


def save_json(path: str, data: Dict[str, Any]) -> None:
    """
    Save dictionary as JSON file.
    
    Args:
        path: Output file path
        data: Dictionary to save
    """
    ensure_dirs(os.path.dirname(path))
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)


def load_json(path: str) -> Dict[str, Any]:
    """
    Load JSON file as dictionary.
    
    Args:
        path: JSON file path
        
    Returns:
        Dictionary loaded from JSON
    """
    with open(path, 'r') as f:
        return json.load(f)


def load_env_path(var: str, default: str) -> str:
    """
    Load path from environment variable or use default.
    
    Args:
        var: Environment variable name
        default: Default path if env var not set
        
    Returns:
        Path from environment or default
    """
    return os.getenv(var, default)


def file_exists(path: str) -> bool:
    """
    Check if file exists.
    
    Args:
        path: File path to check
        
    Returns:
        True if file exists, False otherwise
    """
    return os.path.isfile(path)


def print_metrics(metrics: Dict[str, float], title: str = "Metrics") -> None:
    """
    Print metrics in a formatted way.
    
    Args:
        metrics: Dictionary of metric names and values
        title: Title to display
    """
    print(f"\n{title}")
    print("=" * len(title))
    for metric, value in metrics.items():
        if isinstance(value, (int, float)):
            print(f"{metric.upper()}: {value:.4f}")
        else:
            print(f"{metric.upper()}: {value}")