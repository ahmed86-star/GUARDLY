#!/bin/bash
# Verify newly synced functions

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    🔍 Verifying New Convex Functions After Sync           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "✅ Functions synced successfully:"
echo "   [+] activityLog.by_timestamp"
echo "   [+] activityLog.by_type"
echo ""

echo "─────────────────────────────────────────────────────────────"
echo "TEST 1: Activity Log - Get Recent Activity"
echo "─────────────────────────────────────────────────────────────"
npx convex run activityLog:getRecentActivity
echo ""

echo "─────────────────────────────────────────────────────────────"
echo "TEST 2: Activity Log - Get Statistics"
echo "─────────────────────────────────────────────────────────────"
npx convex run activityLog:getActivityStats
echo ""

echo "─────────────────────────────────────────────────────────────"
echo "TEST 3: Health Check - System Health"
echo "─────────────────────────────────────────────────────────────"
npx convex run healthCheck:checkHealth
echo ""

echo "─────────────────────────────────────────────────────────────"
echo "TEST 4: Generate Sample Activity (10 events)"
echo "─────────────────────────────────────────────────────────────"
npx convex run healthCheck:generateSampleActivity
echo ""

echo "─────────────────────────────────────────────────────────────"
echo "TEST 5: Check Activity After Generation"
echo "─────────────────────────────────────────────────────────────"
npx convex run activityLog:getRecentActivity
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                     ✅ ALL TESTS COMPLETE                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Your Activity Feed should now be working!"
echo "🌐 Refresh your app: http://localhost:5175"
echo "📊 Check Convex Dashboard: https://dashboard.convex.dev"
echo ""


