# Convex Setup Script for GUARDLY
# Run this script to complete the Convex setup

Write-Host "🚀 Starting Convex Setup for GUARDLY..." -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (Test-Path .env.local) {
    Write-Host "✅ .env.local file found" -ForegroundColor Green
    Write-Host "   Convex URL configured: https://modest-kiwi-454.convex.cloud" -ForegroundColor Gray
} else {
    Write-Host "❌ .env.local file not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan

# Install npm packages
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host "   Please make sure Node.js and npm are installed" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Optional - Deploy to Convex:" -ForegroundColor Cyan
Write-Host "  npx convex deploy --prod" -ForegroundColor White
Write-Host ""
Write-Host "📖 See CONVEX_SETUP_COMPLETE.md for more details" -ForegroundColor Gray

