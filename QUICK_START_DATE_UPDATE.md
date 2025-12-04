# 🚀 Quick Start: Update Git Dates

This will update your Git commit dates from **March 2025** to **October 2025** (adds 214 days).

## 🎯 What You Need to Know

- ✅ Your codebase will **NOT** change
- ⚠️ Git commit history **WILL** be rewritten
- 📤 You'll need to **force push** to GitHub
- 🔒 A backup branch will be created automatically

## 📋 Simple Steps

### Option 1: Automated (Easiest)

**Just run this in PowerShell:**

```powershell
.\update-dates.ps1
```

The script will:
1. ✅ Create a backup branch
2. 🔄 Update all commit dates (+214 days)
3. 📊 Show you the new dates
4. 📝 Tell you what to do next

### Option 2: Manual (If automated doesn't work)

**Open Git Bash** and run:

```bash
# Create backup
git branch backup-before-date-change

# Update dates
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter './rebase-helper.sh' --tag-name-filter cat -- --all

# Check results
git log --pretty=format:"%ai %s" -10
```

## 📤 After Running the Update

Once the dates are updated and you've verified they look correct:

```bash
# Push to GitHub
git push --force origin main
```

## 🆘 If Something Goes Wrong

```bash
# Restore from backup
git reset --hard backup-before-date-change
git push --force origin main
```

## 📅 Expected Changes

Your commits will change like this:
- **March 14, 2025** → **October 14, 2025**
- **March 20, 2025** → **October 20, 2025**  
- **March 21, 2025** → **October 21, 2025**

## 📖 Need More Details?

See `UPDATE_DATES_GUIDE.md` for comprehensive instructions and troubleshooting.

---

**Ready?** Run `.\update-dates.ps1` to get started! 🚀

