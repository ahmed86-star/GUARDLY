#!/bin/bash
# GUARDLY - Start Development Server in WSL

echo "🚀 Starting GUARDLY with Convex..."
echo ""

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check Node.js version
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local found"
    echo "   Convex URL: $(grep VITE_CONVEX_URL .env.local)"
else
    echo "❌ .env.local not found!"
    exit 1
fi

echo ""
echo "🔥 Starting development server..."
echo "   Open: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the dev server
npm run dev


