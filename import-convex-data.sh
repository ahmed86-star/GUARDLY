#!/bin/bash
# Import sample data into Convex

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "📊 Importing Security Tips..."
npx convex import --table securityTips sampleSecurityTips.jsonl

echo ""
echo "📊 Importing Password Analyses..."
npx convex import --table passwordAnalyses samplePasswordAnalyses.jsonl

echo ""
echo "✅ Data import complete!"
echo ""
echo "🌐 Check your data at: https://dashboard.convex.dev"
echo "🖥️  View your app at: http://localhost:5175"


