# 🔧 Fix: npm Not Found in PowerShell

## The Issue
Your PowerShell terminal can't find `npm`, even though Node.js is likely installed.

## Quick Fixes (Try These in Order)

### Solution 1: Refresh Your PowerShell Session

**Close and reopen your PowerShell terminal**, then try again:
```powershell
npm install
```

### Solution 2: Use Command Prompt Instead

1. Open **Command Prompt** (cmd.exe) instead of PowerShell
2. Navigate to your project:
   ```cmd
   cd C:\Users\progr\Documents\Autumn_Semester_2025\CSCI-2999_B04L_02648_Capstone\project\GUARDLY
   ```
3. Run:
   ```cmd
   npm install
   npm run dev
   ```

### Solution 3: Refresh Environment Variables in Current Session

Run this in your PowerShell:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
npm install
```

### Solution 4: Find and Add Node.js to PATH Manually

1. Find where Node.js is installed:
   ```powershell
   Get-ChildItem -Path "C:\Program Files" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
   Get-ChildItem -Path "C:\Program Files (x86)" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
   Get-ChildItem -Path "$env:LOCALAPPDATA\Programs" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
   ```

2. Once found, add it to your session:
   ```powershell
   $env:Path += ";C:\Program Files\nodejs"
   npm install
   ```

### Solution 5: Reinstall Node.js (If Nothing Else Works)

1. Download Node.js from: https://nodejs.org/
2. Run the installer
3. Make sure to check "Add to PATH" during installation
4. Restart your terminal
5. Run: `npm install`

## Verify Node.js is Installed

Try these commands:
```powershell
node --version
npm --version
```

If these don't work, Node.js needs to be installed or added to PATH.

## Alternative: Use VS Code Terminal

If you have VS Code:
1. Open VS Code
2. Open this project folder
3. Use the integrated terminal (View → Terminal)
4. VS Code often has better PATH handling
5. Run: `npm install`

---

**Once npm is working, come back and run:**
```bash
npm install
npm run dev
```


