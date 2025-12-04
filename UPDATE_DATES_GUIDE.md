# 📅 Guide to Update Git Commit Dates from March 2025 to October 2025

This guide will help you update your commit dates from March 2025 to October 2025 (adding 214 days).

## ⚠️ Important Warnings

1. **This will rewrite Git history** - All commit SHAs will change
2. **Force push required** - You'll need to force push to GitHub
3. **Backup recommended** - Create a backup before proceeding
4. **Collaborators affected** - If anyone has cloned your repo, they'll need to re-clone

## 🔧 Prerequisites

You need Git Bash installed (comes with Git for Windows). This won't work in PowerShell.

## 📝 Steps to Update Dates

### Step 1: Create a Backup

```bash
# In Git Bash or PowerShell
git branch backup-before-date-change
git push origin backup-before-date-change
```

### Step 2: Run the Date Update Command

**Open Git Bash** (not PowerShell) and navigate to your project directory, then run:

```bash
export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch -f --env-filter '
    DAYS_TO_ADD=214
    SECONDS_TO_ADD=$((DAYS_TO_ADD * 86400))
    
    # Update author date
    if [ ! -z "$GIT_AUTHOR_DATE" ]; then
        OLD_DATE=$GIT_AUTHOR_DATE
        NEW_DATE=$(date -d "$OLD_DATE + $DAYS_TO_ADD days" +"%a %b %d %H:%M:%S %Y %z" 2>/dev/null)
        if [ ! -z "$NEW_DATE" ]; then
            export GIT_AUTHOR_DATE="$NEW_DATE"
        fi
    fi
    
    # Update committer date
    if [ ! -z "$GIT_COMMITTER_DATE" ]; then
        OLD_DATE=$GIT_COMMITTER_DATE
        NEW_DATE=$(date -d "$OLD_DATE + $DAYS_TO_ADD days" +"%a %b %d %H:%M:%S %Y %z" 2>/dev/null)
        if [ ! -z "$NEW_DATE" ]; then
            export GIT_COMMITTER_DATE="$NEW_DATE"
        fi
    fi
' --tag-name-filter cat -- --all
```

### Step 3: Verify the Changes

```bash
# Check the updated dates
git log --pretty=format:"%ai %s" -10
```

You should see dates in October 2025 instead of March 2025.

### Step 4: Push to GitHub

```bash
# Force push to update GitHub
git push --force origin main
```

## 🔄 Alternative: Simpler Method Using rebase-helper.sh

If the above doesn't work, try this approach:

### Create a helper script:

Create a file called `rebase-helper.sh`:

```bash
#!/bin/bash
# Add 214 days (18489600 seconds) to the commit date

# Parse the date components
if [ ! -z "$GIT_AUTHOR_DATE" ]; then
    # Extract epoch timestamp and timezone
    TIMESTAMP=$(echo $GIT_AUTHOR_DATE | cut -d' ' -f1 | tr -d '@')
    TIMEZONE=$(echo $GIT_AUTHOR_DATE | cut -d' ' -f2)
    
    # Add seconds
    NEW_TIMESTAMP=$((TIMESTAMP + 18489600))
    
    export GIT_AUTHOR_DATE="@${NEW_TIMESTAMP} ${TIMEZONE}"
fi

if [ ! -z "$GIT_COMMITTER_DATE" ]; then
    TIMESTAMP=$(echo $GIT_COMMITTER_DATE | cut -d' ' -f1 | tr -d '@')
    TIMEZONE=$(echo $GIT_COMMITTER_DATE | cut -d' ' -f2)
    NEW_TIMESTAMP=$((TIMESTAMP + 18489600))
    export GIT_COMMITTER_DATE="@${NEW_TIMESTAMP} ${TIMEZONE}"
fi
```

### Run with the helper:

```bash
export FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter './rebase-helper.sh' --tag-name-filter cat -- --all
```

## 🆘 Troubleshooting

### If something goes wrong:

```bash
# Restore from backup
git reset --hard backup-before-date-change
```

### If you already force-pushed and need to undo:

```bash
# Reset to backup
git reset --hard backup-before-date-change

# Force push the backup
git push --force origin main
```

## 🎯 Expected Results

- **March 14, 2025** → **October 14, 2025**
- **March 20, 2025** → **October 20, 2025**
- **March 21, 2025** → **October 21, 2025**

## 📞 Need Help?

If you run into issues:
1. Make sure you're using Git Bash, not PowerShell
2. Verify Git is up to date: `git --version`
3. Check that you have no uncommitted changes: `git status`
4. Ensure you have a backup branch created

---

**Note**: The codebase itself remains unchanged - only Git metadata (commit dates) are modified.

