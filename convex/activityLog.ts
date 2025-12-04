import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get recent activity (paginated)
export const getRecentActivity = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    return await ctx.db
      .query("activityLog")
      .withIndex("by_timestamp")
      .order("desc")
      .take(limit);
  },
});

// Query: Get activity by type
export const getActivityByType = query({
  args: { 
    type: v.string(),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    return await ctx.db
      .query("activityLog")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .order("desc")
      .take(limit);
  },
});

// Query: Get activity stats
export const getActivityStats = query({
  args: {},
  handler: async (ctx) => {
    const allActivity = await ctx.db.query("activityLog").collect();
    
    const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
    const recentActivity = allActivity.filter(a => a.timestamp > last24Hours);
    
    const typeBreakdown = allActivity.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: allActivity.length,
      last24Hours: recentActivity.length,
      typeBreakdown,
      mostActive: Object.entries(typeBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([type, count]) => ({ type, count })),
    };
  },
});

// Mutation: Log activity
export const logActivity = mutation({
  args: {
    type: v.string(),
    action: v.string(),
    details: v.optional(v.string()),
    severity: v.optional(v.string()), // "info", "warning", "success", "error"
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activityLog", {
      type: args.type,
      action: args.action,
      details: args.details || "",
      severity: args.severity || "info",
      metadata: args.metadata,
      timestamp: Date.now(),
    });
  },
});

// Mutation: Clear old logs (retention policy)
export const clearOldLogs = mutation({
  args: { daysToKeep: v.number() },
  handler: async (ctx, args) => {
    const cutoffTime = Date.now() - args.daysToKeep * 24 * 60 * 60 * 1000;
    const oldLogs = await ctx.db
      .query("activityLog")
      .withIndex("by_timestamp")
      .filter((q) => q.lt(q.field("timestamp"), cutoffTime))
      .collect();
    
    for (const log of oldLogs) {
      await ctx.db.delete(log._id);
    }
    
    return { deleted: oldLogs.length };
  },
});


