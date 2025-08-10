#!/usr/bin/env python3
"""
Optional Kaggle dataset download helper.
Only runs if Kaggle API credentials are available.
"""
import os
import sys
import argparse
from pathlib import Path


def download_kaggle_dataset(dataset_id: str = "rkiattisak/student-performance-factors", 
                          output_dir: str = "data"):
    """
    Download dataset from Kaggle if API credentials are available.
    
    Args:
        dataset_id: Kaggle dataset identifier
        output_dir: Directory to save the dataset
    """
    # Check for Kaggle API credentials
    kaggle_username = os.getenv('KAGGLE_USERNAME')
    kaggle_key = os.getenv('KAGGLE_KEY')
    
    if not kaggle_username or not kaggle_key:
        print("Kaggle API credentials not found.")
        print("\nTo download the dataset automatically:")
        print("1. Create a Kaggle account at https://www.kaggle.com/")
        print("2. Go to Account settings -> API -> Create New API Token")
        print("3. Set environment variables:")
        print("   export KAGGLE_USERNAME='your-username'")
        print("   export KAGGLE_KEY='your-api-key'")
        print("4. Or download manually from:")
        print(f"   https://www.kaggle.com/datasets/{dataset_id}")
        print(f"   and place CSV files in the '{output_dir}/' directory")
        return False
    
    try:
        import kaggle
        
        # Create output directory
        Path(output_dir).mkdir(exist_ok=True)
        
        print(f"Downloading dataset: {dataset_id}")
        print(f"Output directory: {output_dir}")
        
        # Download dataset
        kaggle.api.dataset_download_files(
            dataset_id, 
            path=output_dir, 
            unzip=True
        )
        
        print("Dataset downloaded successfully!")
        
        # List downloaded files
        data_path = Path(output_dir)
        csv_files = list(data_path.glob("*.csv"))
        if csv_files:
            print("\nDownloaded CSV files:")
            for csv_file in csv_files:
                print(f"  - {csv_file}")
                
            # Rename first CSV to expected name if needed
            expected_name = "student_performance.csv"
            expected_path = data_path / expected_name
            if not expected_path.exists() and csv_files:
                csv_files[0].rename(expected_path)
                print(f"\nRenamed {csv_files[0].name} to {expected_name}")
                
            print(f"\nDataset ready at: {expected_path}")
        
        return True
        
    except ImportError:
        print("Kaggle API not installed. Install with: pip install kaggle")
        return False
    except Exception as e:
        print(f"Error downloading dataset: {e}")
        print("\nPlease download manually from:")
        print(f"https://www.kaggle.com/datasets/{dataset_id}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Download Kaggle dataset for student score prediction')
    parser.add_argument('--dataset-id', type=str, 
                       default='rkiattisak/student-performance-factors',
                       help='Kaggle dataset identifier')
    parser.add_argument('--output-dir', type=str, default='data',
                       help='Output directory for dataset')
    
    args = parser.parse_args()
    
    success = download_kaggle_dataset(args.dataset_id, args.output_dir)
    
    if not success:
        print(f"\nFor this project, you can also use the demo dataset:")
        print(f"  The project will automatically create a synthetic dataset if no real data is found.")
        print(f"  Just run: make linear")


if __name__ == "__main__":
    main()