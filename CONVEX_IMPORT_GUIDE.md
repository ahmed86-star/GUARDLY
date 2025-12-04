# 🚀 GUARDLY - Convex Setup & Import Guide

## Step 1: Login to Convex

In your WSL terminal, run:

```bash
npx convex dev
```

- Follow the GitHub login prompts
- Select or create a project
- The command will continue running to sync your schema and functions

**Keep this terminal running!**

---

## Step 2: Import Sample Data

Once `npx convex dev` is running, open a **NEW WSL terminal** and run:

### Import Security Tips:
```bash
npx convex import --table securityTips sampleSecurityTips.jsonl
```

### Import Password Analyses:
```bash
npx convex import --table passwordAnalyses samplePasswordAnalyses.jsonl
```

---

## Step 3: Verify Data Imported

You can check your data in the Convex Dashboard:

1. Go to: https://dashboard.convex.dev
2. Select your project
3. Click on "Data" in the sidebar
4. You should see:
   - `securityTips` table with 10 entries
   - `passwordAnalyses` table with 8 entries

---

## Step 4: Switch to Real Convex Dashboard

Once data is imported, update your app to use the real Convex dashboard:

1. Open `src/components/home.tsx`
2. Change:
   ```tsx
   import ConvexSecurityDashboardDemo from "./ConvexSecurityDashboardDemo";
   ```
   to:
   ```tsx
   import ConvexSecurityDashboard from "./ConvexSecurityDashboard";
   ```

3. And change:
   ```tsx
   <ConvexSecurityDashboardDemo />
   ```
   to:
   ```tsx
   <ConvexSecurityDashboard />
   ```

---

## Step 5: View Your App

Open your browser to: **http://localhost:5175**

You should now see:
- ✅ Real-time data from Convex
- ✅ "Seed Sample Data" button (adds more data)
- ✅ "Add Random Tip" button (adds new tips)
- ✅ Live updates when you click buttons

---

## Available Convex Functions

### Queries (Read Data):
- `api.securityTips.getAllTips` - Get all security tips
- `api.securityTips.getTopTips` - Get top priority tips
- `api.securityTips.getTipsByCategory` - Get tips by category
- `api.passwordAnalyses.getRecentAnalyses` - Get recent analyses
- `api.passwordAnalyses.getStats` - Get statistics

### Mutations (Write Data):
- `api.securityTips.addTip` - Add a new security tip
- `api.securityTips.deleteTip` - Delete a tip
- `api.passwordAnalyses.saveAnalysis` - Save password analysis
- `api.seedData.seedSecurityTips` - Seed sample tips
- `api.seedData.seedPasswordAnalyses` - Seed sample analyses

---

## Troubleshooting

**Problem:** `npx convex dev` says "Cannot prompt for input"
- **Solution:** Run it in an interactive terminal (not through scripts)

**Problem:** Import command fails
- **Solution:** Make sure `npx convex dev` is running first

**Problem:** API functions not found
- **Solution:** Wait for `npx convex dev` to finish syncing (watch the terminal)

**Problem:** Data doesn't appear in app
- **Solution:** Check browser console for errors, refresh the page

---

## Next Steps

After everything is working:
1. Try clicking "Add Random Tip" to add new tips in real-time
2. Check the Convex Dashboard to see the data update
3. Explore the different queries and mutations
4. Build your own Convex functions!

🎉 Enjoy your real-time security dashboard powered by Convex!


