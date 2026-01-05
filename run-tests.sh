#!/bin/bash

echo "========================================"
echo "PastedPerfect Testing Suite"
echo "========================================"
echo ""

echo "[1/3] Running Unit Tests..."
echo ""
npm test -- --passWithNoTests --maxWorkers=2
if [ $? -ne 0 ]; then
    echo ""
    echo "WARNING: Some unit tests failed"
    echo ""
else
    echo ""
    echo "SUCCESS: All unit tests passed!"
    echo ""
fi

echo ""
echo "========================================"
echo ""
echo "[2/3] Building Project..."
echo ""
npm run build
if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Build failed"
    exit 1
fi

echo ""
echo "SUCCESS: Build completed!"
echo ""

echo "========================================"
echo ""
echo "[3/3] E2E Tests (Optional)"
echo ""
echo "To run E2E tests, execute:"
echo "  npm run test:e2e"
echo ""
echo "To run E2E tests with UI:"
echo "  npm run test:e2e:ui"
echo ""

echo "========================================"
echo "Testing Complete!"
echo "========================================"
echo ""
echo "View coverage report: coverage/lcov-report/index.html"
echo ""
