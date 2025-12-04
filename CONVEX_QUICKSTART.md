# 🚀 GUARDLY - Convex Quick Start

Follow these steps to get your real-time security dashboard working with Convex!

---

## ✅ Already Done

You already have:
- ✅ Convex installed (`npm install convex`)
- ✅ ConvexProvider set up in `src/main.tsx`
- ✅ Schema defined in `convex/schema.ts`
- ✅ Query and mutation functions created
- ✅ Sample data files ready to import
- ✅ Demo dashboard working at http://localhost:5175

---

## 🔐 Step 1: Login to Convex (Interactive Terminal Required)

Open a **NEW WSL terminal** (not through scripts) and run:

```bash
cd /mnt/c/Users/progr/Documents/Autumn_Semester_2025/CSCI-2999_B04L_02648_Capstone/project/GUARDLY

# Load Node.js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Start Convex dev server
npx convex dev
```

**Follow the prompts:**
1. Login with GitHub
2. Create or select a project named "GUARDLY" or similar
3. The deployment URL will be saved to `.env.local`

**Keep this terminal running!** It will watch for changes and sync your schema/functions.

---

## 📊 Step 2: Import Sample Data

Once `npx convex dev` is running and shows "✓ Convex functions ready!", open a **SECOND WSL terminal** and run:

```bash
cd /mnt/c/Users/progr/Documents/Autumn_Semester_2025/CSCI-2999_B04L_02648_Capstone/project/GUARDLY

# Load Node.js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Import the data
bash import-convex-data.sh
```

Or run the commands manually:

```bash
npx convex import --table securityTips sampleSecurityTips.jsonl
npx convex import --table passwordAnalyses samplePasswordAnalyses.jsonl
```

You should see:
```
✔ Imported 10 rows into securityTips
✔ Imported 8 rows into passwordAnalyses
```

---

## 🌐 Step 3: View Your Data in Convex Dashboard

1. Go to: https://dashboard.convex.dev
2. Login with GitHub
3. Select your project
4. Click "Data" in the sidebar
5. Verify you see:
   - **securityTips** table with 10 rows
   - **passwordAnalyses** table with 8 rows

---

## 🎨 Step 4: Switch to Real-Time Dashboard

Update your app to use real Convex data:

### Edit `src/components/home.tsx`:

**Change line 6:**
```tsx
// FROM:
import ConvexSecurityDashboardDemo from "./ConvexSecurityDashboardDemo";

// TO:
import ConvexSecurityDashboard from "./ConvexSecurityDashboard";
```

**Change line 58:**
```tsx
// FROM:
<ConvexSecurityDashboardDemo />

// TO:
<ConvexSecurityDashboard />
```

---

## 🎉 Step 5: See It Working!

1. **Open your browser:** http://localhost:5175
2. **You should see:**
   - Real data from Convex (not demo data)
   - 10 security tips
   - 8 password analyses
   - Live statistics

3. **Try the interactive features:**
   - Click **"Add Random Tip"** → New tip appears instantly
   - Click **"Seed Sample Data"** → More sample data added
   - Open Convex Dashboard → See data update in real-time
   - Change data in Dashboard → See app update automatically!

---

## 🎮 Available Convex Functions

### Your Convex API Functions:

#### Queries (Read Data):
```typescript
api.securityTips.getAllTips        // Get all security tips
api.securityTips.getTopTips        // Get top priority tips (default: 5)
api.securityTips.getTipsByCategory // Get tips by category
api.passwordAnalyses.getRecentAnalyses  // Get recent analyses
api.passwordAnalyses.getStats      // Get aggregate statistics
api.passwordAnalyses.getAnalysesByStrength // Filter by strength
```

#### Mutations (Write Data):
```typescript
api.securityTips.addTip           // Add a new security tip
api.securityTips.deleteTip        // Delete a tip by ID
api.passwordAnalyses.saveAnalysis // Save a password analysis
api.seedData.seedSecurityTips     // Seed 10 sample tips
api.seedData.seedPasswordAnalyses // Seed 4 sample analyses
```

---

## 📝 Example: Using Convex in Your Components

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function MyComponent() {
  // Read data
  const tips = useQuery(api.securityTips.getAllTips);
  const stats = useQuery(api.passwordAnalyses.getStats);
  
  // Write data
  const addTip = useMutation(api.securityTips.addTip);
  
  const handleAddTip = async () => {
    await addTip({
      title: "New Security Tip",
      description: "Important security advice",
      category: "general",
      priority: 3,
    });
  };
  
  return (
    <div>
      <h2>Total Tips: {tips?.length}</h2>
      <button onClick={handleAddTip}>Add Tip</button>
    </div>
  );
}
```

---

## 🔧 Troubleshooting

### Problem: "Cannot prompt for input in non-interactive terminals"
**Solution:** Run `npx convex dev` directly in an interactive WSL terminal, not through a script.

### Problem: Import fails with "table not found"
**Solution:** Make sure `npx convex dev` is running and shows "✓ Convex functions ready!" before importing.

### Problem: API functions return undefined
**Solution:** 
1. Check if `npx convex dev` is running
2. Check browser console for errors
3. Refresh the page
4. Verify `.env.local` has `VITE_CONVEX_URL`

### Problem: Changes to convex/*.ts files don't take effect
**Solution:** Make sure `npx convex dev` is running - it watches for file changes.

### Problem: "Module not found" errors
**Solution:** Wait for `npx convex dev` to finish syncing and generate `convex/_generated/api.d.ts`

---

## 📁 Your Convex Files

```
convex/
├── schema.ts              # Database schema (tables & types)
├── securityTips.ts        # Security tips queries & mutations
├── passwordAnalyses.ts    # Password analysis queries & mutations
├── seedData.ts            # Sample data seeding functions
├── convex.config.ts       # Convex configuration
└── _generated/
    └── api.d.ts           # Auto-generated API types
```

---

## 🎯 What You Get

✅ **Real-time updates** - Data syncs automatically across all clients
✅ **Type safety** - Full TypeScript support
✅ **Optimistic updates** - UI updates instantly
✅ **Automatic caching** - No need to manage state
✅ **Scalable backend** - No server to maintain
✅ **Live queries** - Data updates when database changes

---

## 📚 Learn More

- 📖 [Convex Documentation](https://docs.convex.dev)
- 🎓 [Convex React Tutorial](https://docs.convex.dev/quickstart/react)
- 🔧 [Convex Dashboard](https://dashboard.convex.dev)

---

**Happy coding! 🛡️ Your GUARDLY security app is now powered by Convex!**


