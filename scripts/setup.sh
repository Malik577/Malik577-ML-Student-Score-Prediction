#!/bin/bash

# 🎓 Student Performance Predictor - Setup Script
# This script sets up the complete development environment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Python version
check_python_version() {
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}' | cut -d. -f1,2)
        if [[ $(echo "$PYTHON_VERSION >= 3.8" | bc -l) -eq 1 ]]; then
            print_success "Python $PYTHON_VERSION found"
            PYTHON_CMD="python3"
        else
            print_error "Python 3.8+ required, found $PYTHON_VERSION"
            exit 1
        fi
    elif command_exists python; then
        PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}' | cut -d. -f1,2)
        if [[ $(echo "$PYTHON_VERSION >= 3.8" | bc -l) -eq 1 ]]; then
            print_success "Python $PYTHON_VERSION found"
            PYTHON_CMD="python"
        else
            print_error "Python 3.8+ required, found $PYTHON_VERSION"
            exit 1
        fi
    else
        print_error "Python not found. Please install Python 3.8+"
        exit 1
    fi
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d. -f1)
        if [[ $NODE_VERSION -ge 16 ]]; then
            print_success "Node.js v$(node --version) found"
        else
            print_error "Node.js 16+ required, found v$(node --version)"
            exit 1
        fi
    else
        print_error "Node.js not found. Please install Node.js 16+"
        exit 1
    fi
}

# Function to check npm
check_npm() {
    if command_exists npm; then
        print_success "npm $(npm --version) found"
    else
        print_error "npm not found. Please install npm"
        exit 1
    fi
}

# Function to setup Python backend
setup_python_backend() {
    print_status "Setting up Python backend..."
    
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [[ ! -d "venv" ]]; then
        print_status "Creating Python virtual environment..."
        $PYTHON_CMD -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Upgrade pip
    print_status "Upgrading pip..."
    pip install --upgrade pip
    
    # Install requirements
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    
    # Test ML pipeline
    print_status "Testing ML pipeline..."
    python notebooks/student_score_prediction.py
    
    print_success "Python backend setup complete!"
    cd ..
}

# Function to setup React frontend
setup_react_frontend() {
    print_status "Setting up React frontend..."
    
    # Install Node.js dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    # Build the project to check for errors
    print_status "Building project to verify setup..."
    npm run build
    
    print_success "React frontend setup complete!"
}

# Function to create development environment file
create_env_file() {
    if [[ ! -f ".env" ]]; then
        print_status "Creating .env file..."
        cat > .env << EOF
# Development Environment Configuration
NODE_ENV=development
VITE_APP_TITLE=Student Performance Predictor
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:8000
EOF
        print_success ".env file created"
    else
        print_warning ".env file already exists"
    fi
}

# Function to run health checks
run_health_checks() {
    print_status "Running health checks..."
    
    # Check if ML pipeline works
    cd backend
    source venv/bin/activate
    python -c "
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
print('✓ ML dependencies working')
"
    cd ..
    
    # Check if React app builds
    npm run build > /dev/null 2>&1
    print_success "✓ React app builds successfully"
    
    print_success "All health checks passed!"
}

# Function to display next steps
show_next_steps() {
    echo
    echo -e "${GREEN}🎉 Setup Complete!${NC}"
    echo
    echo -e "${BLUE}Next Steps:${NC}"
    echo "1. Start the development server: ${YELLOW}npm run dev${NC}"
    echo "2. Open your browser to: ${YELLOW}http://localhost:5173${NC}"
    echo "3. Run ML pipeline: ${YELLOW}cd backend && source venv/bin/activate && python notebooks/student_score_prediction.py${NC}"
    echo
    echo -e "${BLUE}Useful Commands:${NC}"
    echo "• ${YELLOW}npm run dev${NC} - Start development server"
    echo "• ${YELLOW}npm run build${NC} - Build for production"
    echo "• ${YELLOW}npm run lint${NC} - Run ESLint"
    echo "• ${YELLOW}cd backend && source venv/bin/activate${NC} - Activate Python environment"
    echo
    echo -e "${BLUE}Documentation:${NC}"
    echo "• README.md - Main project documentation"
    echo "• docs/ - Detailed technical guides"
    echo "• CONTRIBUTING.md - How to contribute"
    echo
}

# Main setup function
main() {
    echo -e "${BLUE}🎓 Student Performance Predictor - Setup Script${NC}"
    echo "=================================================="
    echo
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_python_version
    check_node_version
    check_npm
    
    # Create necessary directories
    print_status "Creating project directories..."
    mkdir -p backend/data backend/ml backend/notebooks backend/scripts
    mkdir -p src/components src/hooks src/pages src/types src/utils
    mkdir -p assets/visualizations assets/images
    mkdir -p docs tests/backend tests/frontend tests/integration
    
    # Setup Python backend
    setup_python_backend
    
    # Setup React frontend
    setup_react_frontend
    
    # Create environment file
    create_env_file
    
    # Run health checks
    run_health_checks
    
    # Show next steps
    show_next_steps
}

# Run main function
main "$@" 