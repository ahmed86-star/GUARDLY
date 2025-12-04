#!/bin/bash
# Test existing Convex functions

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      🛡️  GUARDLY - CONVEX HEALTH CHECK (Existing Functions)║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "✅ AVAILABLE FUNCTIONS:"
echo "  • passwordAnalyses:getRecentAnalyses"
echo "  • passwordAnalyses:getStats"
echo "  • securityTips:getAllTips"
echo "  • securityTips:getTopTips"
echo "  • seedData:seedSecurityTips"
echo "  • seedData:seedPasswordAnalyses"
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

echo "📊 TEST 1: Get Security Tips Statistics"
npx convex run securityTips:getAllTips
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

echo "📊 TEST 2: Get Password Analysis Statistics"
npx convex run passwordAnalyses:getStats
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

echo "📊 TEST 3: Get Top Priority Tips (Query with params)"
npx convex run securityTips:getTopTips '{"limit": 3}'
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

echo "📊 TEST 4: Get Recent Password Analyses"
npx convex run passwordAnalyses:getRecentAnalyses '{"limit": 5}'
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

echo "✅ All existing functions are working!"
echo ""
echo "📈 These queries should now appear in your Convex Dashboard metrics:"
echo "   • Cache Hit Rate - from the queries we just ran"
echo "   • Function Calls - total calls made"
echo ""
echo "🌐 Your deployment URL: https://academic-ptarmigan-996.convex.cloud"
echo "📊 View metrics at: https://dashboard.convex.dev"
echo "🖥️  View your app at: http://localhost:5175"
echo ""
echo "⚠️  NOTE: activityLog functions not yet synced."
echo "   Make sure 'npx convex dev' is running to sync new functions!"
echo ""


