import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get recent password analyses
export const getRecentAnalyses = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    return await ctx.db
      .query("passwordAnalyses")
      .withIndex("by_timestamp")
      .order("desc")
      .take(limit);
  },
});

// Query: Get analyses by strength
export const getAnalysesByStrength = query({
  args: { strength: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("passwordAnalyses")
      .withIndex("by_strength", (q) => q.eq("strength", args.strength))
      .collect();
  },
});

// Query: Get statistics
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const allAnalyses = await ctx.db.query("passwordAnalyses").collect();
    
    const total = allAnalyses.length;
    const avgScore = total > 0 
      ? allAnalyses.reduce((sum, a) => sum + a.score, 0) / total 
      : 0;
    
    const strengthCounts = {
      weak: allAnalyses.filter(a => a.strength === "weak").length,
      medium: allAnalyses.filter(a => a.strength === "medium").length,
      strong: allAnalyses.filter(a => a.strength === "strong").length,
      "very-strong": allAnalyses.filter(a => a.strength === "very-strong").length,
    };

    return {
      total,
      averageScore: Math.round(avgScore),
      strengthCounts,
    };
  },
});

// Mutation: Save a password analysis
export const saveAnalysis = mutation({
  args: {
    strength: v.string(),
    score: v.number(),
    hasUppercase: v.boolean(),
    hasLowercase: v.boolean(),
    hasNumbers: v.boolean(),
    hasSpecialChars: v.boolean(),
    length: v.number(),
    suggestions: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("passwordAnalyses", {
      ...args,
      timestamp: Date.now(),
    });
  },
});


