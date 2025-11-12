#!/bin/bash

echo "🚀 Starting local extension test..."

# Clean and build
echo "📦 Building extension..."
npm run clean
npm run build

# Run unit tests
echo "🧪 Running unit tests..."
npm test

# Start E2E tests
echo "🎭 Running E2E tests..."
npm run test:e2e

echo "✅ All tests completed!"
