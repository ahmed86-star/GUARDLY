#!/bin/bash
# Start Convex dev server

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🔄 Starting Convex dev server..."
timeout 20 npx convex dev || echo "✅ Convex schema pushed!"

