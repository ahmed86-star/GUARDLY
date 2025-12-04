# PowerShell script to update Git commit dates
# This script will run the update in Git Bash

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
Write-Host "║  📅 Git Commit Date Updater                                ║" -ForegroundColor Cyan
Write-Host "║                                                            ║"
Write-Host "║  This will change dates from March 2025 → October 2025    ║" -ForegroundColor White
Write-Host "║  (Adds 214 days to all commits)                           ║" -ForegroundColor White
Write-Host "╚════════════════════════════════════════════════════════════╝"
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "⚠️  WARNING: This will rewrite Git history!" -ForegroundColor Yellow
Write-Host "   - All commit SHAs will change" -ForegroundColor Yellow
Write-Host "   - You'll need to force push to GitHub" -ForegroundColor Yellow
Write-Host "   - A backup branch will be created" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter to continue or Ctrl+C to cancel..." -ForegroundColor Cyan
Read-Host

# Create backup branch
Write-Host ""
Write-Host "🔄 Creating backup branch..." -ForegroundColor Cyan
git branch backup-before-date-change 2>&1 | Out-Null
Write-Host "✅ Backup branch 'backup-before-date-change' created" -ForegroundColor Green

# Check if Git Bash is available
$gitBashPaths = @(
    "C:\Program Files\Git\bin\bash.exe",
    "C:\Program Files (x86)\Git\bin\bash.exe",
    "$env:ProgramFiles\Git\bin\bash.exe",
    "${env:ProgramFiles(x86)}\Git\bin\bash.exe"
)

$bashPath = $null
foreach ($path in $gitBashPaths) {
    if (Test-Path $path) {
        $bashPath = $path
        break
    }
}

if ($bashPath) {
    Write-Host ""
    Write-Host "✅ Git Bash found at: $bashPath" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔄 Updating commit dates (this may take a moment)..." -ForegroundColor Cyan
    Write-Host ""
    
    # Run the update command using Git Bash
    $command = @"
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter './rebase-helper.sh' --tag-name-filter cat -- --all
"@
    
    & $bashPath -c $command
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Dates updated successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Showing updated commit dates:" -ForegroundColor Cyan
        Write-Host ""
        git log --pretty=format:"%ai %s" | Select-Object -First 10
        Write-Host ""
        Write-Host ""
        Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║                       Next Steps                           ║" -ForegroundColor Green
        Write-Host "╠════════════════════════════════════════════════════════════╣" -ForegroundColor Green
        Write-Host "║                                                            ║"
        Write-Host "║  ✅ Verify the dates above look correct                    ║" -ForegroundColor White
        Write-Host "║                                                            ║"
        Write-Host "║  📤 To push to GitHub, run:                                ║" -ForegroundColor White
        Write-Host "║     git push --force origin main                          ║" -ForegroundColor Yellow
        Write-Host "║                                                            ║"
        Write-Host "║  🔄 If something went wrong, restore from backup:          ║" -ForegroundColor White
        Write-Host "║     git reset --hard backup-before-date-change            ║" -ForegroundColor Yellow
        Write-Host "║     git push --force origin main                          ║" -ForegroundColor Yellow
        Write-Host "║                                                            ║"
        Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Error occurred while updating dates" -ForegroundColor Red
        Write-Host ""
        Write-Host "You can restore from backup with:" -ForegroundColor Yellow
        Write-Host "  git reset --hard backup-before-date-change" -ForegroundColor White
        Write-Host ""
    }
    
} else {
    Write-Host ""
    Write-Host "⚠️  Git Bash not found automatically." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please follow the manual steps in UPDATE_DATES_GUIDE.md" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or run this command in Git Bash:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  export FILTER_BRANCH_SQUELCH_WARNING=1" -ForegroundColor White
    Write-Host "  git filter-branch -f --env-filter './rebase-helper.sh' --tag-name-filter cat -- --all" -ForegroundColor White
    Write-Host ""
}

