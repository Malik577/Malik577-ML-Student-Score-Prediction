#!/usr/bin/env bash
# Run linear regression baseline with default settings

echo "Running Linear Regression Baseline..."
echo "======================================"

python -m src.modeling \
    --model linear \
    --features study_hours \
    --make-plots \
    --save-model

echo ""
echo "Linear regression complete!"
echo "Check outputs/ directory for results:"
echo "- outputs/metrics_linear.json"
echo "- outputs/models/linear_model.pkl"
echo "- outputs/figures/pred_vs_actual_linear.png"
echo "- outputs/figures/residuals_linear.png"