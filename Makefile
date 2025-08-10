# Student Performance Predictor - Development Makefile

.PHONY: help install dev build test clean backend frontend all

# Default target
help:
	@echo "🎓 Student Performance Predictor - Development Commands"
	@echo "=================================================="
	@echo ""
	@echo "📦 Installation:"
	@echo "  make install     - Install all dependencies (frontend + backend)"
	@echo "  make frontend    - Install frontend dependencies only"
	@echo "  make backend     - Install backend dependencies only"
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev         - Start frontend development server"
	@echo "  make backend     - Run backend ML pipeline"
	@echo "  make all         - Start both frontend and backend"
	@echo ""
	@echo "🏗️  Building:"
	@echo "  make build       - Build frontend for production"
	@echo "  make preview     - Preview production build"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test        - Run all tests"
	@echo "  make lint        - Run linting"
	@echo ""
	@echo "🧹 Maintenance:"
	@echo "  make clean       - Clean build artifacts and dependencies"
	@echo "  make reset       - Reset to clean state"

# Install all dependencies
install: frontend backend
	@echo "✅ All dependencies installed successfully!"

# Install frontend dependencies
frontend:
	@echo "📦 Installing frontend dependencies..."
	npm install
	@echo "✅ Frontend dependencies installed!"

# Install backend dependencies
backend:
	@echo "🐍 Setting up Python virtual environment..."
	cd backend && python3 -m venv venv
	@echo "🐍 Activating virtual environment and installing dependencies..."
	cd backend && . venv/bin/activate && python3 -m pip install -r requirements.txt
	@echo "✅ Backend dependencies installed!"

# Start frontend development server
dev:
	@echo "🚀 Starting frontend development server..."
	npm run dev

# Run backend ML pipeline
backend-run:
	@echo "🤖 Running backend ML pipeline..."
	cd backend && . venv/bin/activate && python3 main.py

# Start both frontend and backend
all:
	@echo "🚀 Starting both frontend and backend..."
	@echo "Frontend will be available at: http://localhost:5173"
	@echo "Backend ML pipeline will run in the background..."
	@make -j 2 dev backend-run

# Build frontend for production
build:
	@echo "🏗️  Building frontend for production..."
	npm run build
	@echo "✅ Frontend built successfully!"

# Preview production build
preview:
	@echo "👀 Starting preview server..."
	npm run preview

# Run tests
test:
	@echo "🧪 Running tests..."
	npm run test
	@echo "✅ Tests completed!"

# Run linting
lint:
	@echo "🔍 Running linting..."
	npm run lint
	@echo "✅ Linting completed!"

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	rm -rf backend/__pycache__/
	rm -rf backend/*/__pycache__/
	rm -rf backend/*/*/__pycache__/
	@echo "✅ Cleanup completed!"

# Reset to clean state
reset: clean install
	@echo "🔄 Reset completed! All dependencies reinstalled."

# Quick start for development
quick-start: install dev
	@echo "🚀 Quick start completed! Frontend is running at http://localhost:5173"