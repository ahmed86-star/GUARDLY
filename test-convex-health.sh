#!/bin/bash
# Convex Health Check Script

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        🛡️  GUARDLY - CONVEX HEALTH CHECK                  ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Get deployment URL
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    exit 1
fi

CONVEX_URL=$(grep VITE_CONVEX_URL .env.local | cut -d '=' -f 2)
echo "📡 Convex URL: $CONVEX_URL"
echo ""

# Check if npx convex dev is running
echo "🔍 Checking Convex connection..."
npx convex run healthCheck:checkHealth 2>&1 | head -30
echo ""

echo "─────────────────────────────────────────────────────────────"
echo ""

echo "🧪 Running query tests..."
npx convex run healthCheck:testAllQueries 2>&1 | head -30
echo ""

echo "─────────────────────────────────────────────────────────────"
echo ""

echo "✏️  Testing mutations..."
npx convex run healthCheck:testMutation 2>&1 | head -30
echo ""

echo "─────────────────────────────────────────────────────────────"
echo ""

echo "🚀 Running full system test..."
npx convex run healthCheck:runFullSystemTest 2>&1 | head -40
echo ""

echo "─────────────────────────────────────────────────────────────"
echo ""

echo "📊 Generating sample activity (this will populate your dashboard)..."
npx convex run healthCheck:generateSampleActivity '{"count": 15}' 2>&1 | head -30
echo ""

echo "─────────────────────────────────────────────────────────────"
echo ""

echo "✅ Health check complete!"
echo ""
echo "📈 View metrics at: https://dashboard.convex.dev"
echo "🌐 View your app at: http://localhost:5175"
echo ""
echo "Your dashboard should now show:"
echo "  • Cache Hit Rate (from queries)"
echo "  • Function calls (from mutations)"
echo "  • Live activity in the feed"
echo ""


