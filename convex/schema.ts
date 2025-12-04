import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Security Tips that can be displayed to users
  securityTips: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(), // e.g., "password", "2fa", "phishing", "general"
    priority: v.number(), // 1-5, higher = more important
    createdAt: v.number(),
  }).index("by_category", ["category"])
    .index("by_priority", ["priority"]),

  // Password Analysis History
  passwordAnalyses: defineTable({
    strength: v.string(), // "weak", "medium", "strong", "very-strong"
    score: v.number(), // 0-100
    hasUppercase: v.boolean(),
    hasLowercase: v.boolean(),
    hasNumbers: v.boolean(),
    hasSpecialChars: v.boolean(),
    length: v.number(),
    suggestions: v.array(v.string()),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"])
    .index("by_strength", ["strength"]),

  // Breach Check History (anonymized)
  breachChecks: defineTable({
    domainHash: v.string(), // hashed version of email domain for privacy
    breachCount: v.number(),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),

  // User Security Stats (aggregated data)
  securityStats: defineTable({
    totalPasswordsAnalyzed: v.number(),
    totalBreachChecks: v.number(),
    averagePasswordStrength: v.number(),
    lastActivity: v.number(),
  }),

  // Activity Log (all security events)
  activityLog: defineTable({
    type: v.string(), // "password_check", "breach_check", "tip_added", "security_scan"
    action: v.string(), // Human-readable action description
    details: v.string(), // Additional details
    severity: v.string(), // "info", "warning", "success", "error"
    metadata: v.optional(v.any()), // Additional structured data
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"])
    .index("by_type", ["type", "timestamp"]),
});

