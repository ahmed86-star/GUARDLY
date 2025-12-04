#!/bin/bash
# Deploy Convex schema and functions

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Push Convex schema
echo "📦 Pushing Convex schema and functions..."
npx convex dev --once


