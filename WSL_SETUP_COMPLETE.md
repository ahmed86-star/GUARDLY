# 🐧 WSL Setup Complete! ✅

## What's Been Done

1. ✅ Installed nvm (Node Version Manager) in WSL
2. ✅ Installed Node.js v24.11.1 and npm v11.6.2
3. ✅ Installed all dependencies including Convex v1.29.2
4. ✅ Configured Convex with your deployment URL
5. ✅ Created startup script for easy launching

## 🚀 How to Run Your App

### Option 1: Use the Startup Script (Easiest)

Just run this command:
```bash
wsl ./start-wsl.sh
```

### Option 2: Run Manually in WSL

1. Open WSL terminal:
```bash
wsl
```

2. Navigate to project (if not already there):
```bash
cd /mnt/c/Users/progr/Documents/Autumn_Semester_2025/CSCI-2999_B04L_02648_Capstone/project/GUARDLY
```

3. Load nvm and start the server:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm run dev
```

4. Open in your browser:
```
http://localhost:5173
```

## 📦 Your Convex Setup

- **Deployment URL**: `https://modest-kiwi-454.convex.cloud`
- **HTTP Actions URL**: `https://modest-kiwi-454.convex.site`
- **Environment File**: `.env.local` (created and configured)

## ✨ What's Working Now

- ✅ Full React + TypeScript app
- ✅ Convex integration (Option 1 - frontend only)
- ✅ All your existing features:
  - Email Breach Checker
  - Password Generator
  - Password Strength Analyzer
  - Security Tips
  - Dark/Light Mode

## 🔧 Useful Commands (Run in WSL)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Convex (when ready)
npx convex deploy --prod
```

## 🎯 Next Steps

1. **Run the app**: `wsl ./start-wsl.sh`
2. **Open browser**: Navigate to `http://localhost:5173`
3. **Test it out**: Everything should work exactly as before!
4. **Deploy** (optional): When ready, use `npx convex deploy --prod`

## 💡 Tips

- **Keep WSL terminal open** while developing
- **Hot reload** is enabled - changes update automatically
- **Ctrl+C** to stop the server
- **Use VS Code WSL extension** for better integration

## 🐛 Troubleshooting

If the server won't start:
```bash
# Make sure nvm is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Check Node.js is available
node --version  # Should show v24.11.1
npm --version   # Should show v11.6.2

# Try again
npm run dev
```

If port 5173 is busy:
```bash
# Kill any process on port 5173
lsof -ti:5173 | xargs kill -9

# Or let Vite use a different port (it will auto-detect)
npm run dev
```

---

## 🎉 You're All Set!

Your GUARDLY app is now:
- Running in WSL (better performance) ✅
- Connected to Convex ✅
- Ready for development ✅
- Ready to deploy ✅

**Run `wsl ./start-wsl.sh` and start coding!** 🚀


