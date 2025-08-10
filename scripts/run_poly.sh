#!/usr/bin/env bash
# Run polynomial regression with degree selection

echo "Running Polynomial Regression..."
echo "================================"

# First run with automatic degree selection
echo "Running with automatic degree selection:"
python -m src.modeling \
    --model poly \
    --features study_hours \
    --degree auto \
    --make-plots \
    --save-model

echo ""
echo "Polynomial regression complete!"
echo "Check outputs/ directory for results:"
echo "- outputs/metrics_poly.json"
echo "- outputs/models/poly_best.pkl"
echo "- outputs/figures/metrics_comparison_bar.png"