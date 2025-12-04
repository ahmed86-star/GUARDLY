import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get all security tips
export const getAllTips = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("securityTips")
      .order("desc")
      .collect();
  },
});

// Query: Get tips by category
export const getTipsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("securityTips")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .collect();
  },
});

// Query: Get top priority tips
export const getTopTips = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;
    return await ctx.db
      .query("securityTips")
      .withIndex("by_priority")
      .order("desc")
      .take(limit);
  },
});

// Mutation: Add a new security tip
export const addTip = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    priority: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("securityTips", {
      title: args.title,
      description: args.description,
      category: args.category,
      priority: args.priority,
      createdAt: Date.now(),
    });
  },
});

// Mutation: Delete a tip
export const deleteTip = mutation({
  args: { id: v.id("securityTips") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});


