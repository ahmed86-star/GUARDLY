import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Health check query - tests database connectivity and basic queries
export const checkHealth = query({
  args: {},
  handler: async (ctx) => {
    const startTime = Date.now();
    
    // Test all tables
    const securityTipsCount = (await ctx.db.query("securityTips").collect()).length;
    const passwordAnalysesCount = (await ctx.db.query("passwordAnalyses").collect()).length;
    const activityLogCount = (await ctx.db.query("activityLog").collect()).length;
    
    const responseTime = Date.now() - startTime;
    
    return {
      status: "healthy",
      timestamp: Date.now(),
      responseTime,
      database: {
        connected: true,
        tables: {
          securityTips: { count: securityTipsCount, healthy: true },
          passwordAnalyses: { count: passwordAnalysesCount, healthy: true },
          activityLog: { count: activityLogCount, healthy: true },
        }
      },
      deployment: {
        functionsReady: true,
        version: "1.0.0"
      }
    };
  },
});

// Test all query functions
export const testAllQueries = query({
  args: {},
  handler: async (ctx) => {
    const results: any = {};
    
    try {
      // Test security tips queries
      results.securityTips = {
        all: (await ctx.db.query("securityTips").collect()).length,
        top: (await ctx.db.query("securityTips")
          .withIndex("by_priority")
          .order("desc")
          .take(5)).length,
      };
      
      // Test password analyses queries
      results.passwordAnalyses = {
        all: (await ctx.db.query("passwordAnalyses").collect()).length,
        recent: (await ctx.db.query("passwordAnalyses")
          .withIndex("by_timestamp")
          .order("desc")
          .take(10)).length,
      };
      
      // Test activity log queries
      results.activityLog = {
        all: (await ctx.db.query("activityLog").collect()).length,
        recent: (await ctx.db.query("activityLog")
          .withIndex("by_timestamp")
          .order("desc")
          .take(10)).length,
      };
      
      return {
        success: true,
        results,
        message: "All queries executed successfully"
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: "Query test failed"
      };
    }
  },
});

// Test mutation - creates test data
export const testMutation = mutation({
  args: {},
  handler: async (ctx) => {
    try {
      // Insert a test activity log
      const activityId = await ctx.db.insert("activityLog", {
        type: "health_check",
        action: "Health check test mutation executed",
        details: "Automated health check testing all systems",
        severity: "info",
        metadata: { automated: true, test: true },
        timestamp: Date.now(),
      });
      
      return {
        success: true,
        activityId,
        message: "Test mutation executed successfully"
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: "Mutation test failed"
      };
    }
  },
});

// Comprehensive system test
export const runFullSystemTest = mutation({
  args: {},
  handler: async (ctx) => {
    const testResults: any = {
      startTime: Date.now(),
      tests: {},
    };
    
    try {
      // Test 1: Database connectivity
      testResults.tests.database = {
        status: "testing"
      };
      const tips = await ctx.db.query("securityTips").collect();
      testResults.tests.database = {
        status: "passed",
        recordCount: tips.length
      };
      
      // Test 2: Indexed query
      testResults.tests.indexedQuery = {
        status: "testing"
      };
      const topTips = await ctx.db
        .query("securityTips")
        .withIndex("by_priority")
        .order("desc")
        .take(5);
      testResults.tests.indexedQuery = {
        status: "passed",
        recordCount: topTips.length
      };
      
      // Test 3: Insert operation
      testResults.tests.insert = {
        status: "testing"
      };
      const insertId = await ctx.db.insert("activityLog", {
        type: "system_test",
        action: "Full system test executed",
        details: `Test run at ${new Date().toISOString()}`,
        severity: "success",
        timestamp: Date.now(),
      });
      testResults.tests.insert = {
        status: "passed",
        insertedId: insertId
      };
      
      // Test 4: Aggregation
      testResults.tests.aggregation = {
        status: "testing"
      };
      const allAnalyses = await ctx.db.query("passwordAnalyses").collect();
      const avgScore = allAnalyses.length > 0 
        ? allAnalyses.reduce((sum, a) => sum + a.score, 0) / allAnalyses.length 
        : 0;
      testResults.tests.aggregation = {
        status: "passed",
        averageScore: Math.round(avgScore)
      };
      
      testResults.endTime = Date.now();
      testResults.duration = testResults.endTime - testResults.startTime;
      testResults.overallStatus = "passed";
      testResults.message = "All system tests passed successfully!";
      
      return testResults;
      
    } catch (error: any) {
      testResults.endTime = Date.now();
      testResults.duration = testResults.endTime - testResults.startTime;
      testResults.overallStatus = "failed";
      testResults.error = error.message;
      testResults.message = "System test encountered errors";
      
      return testResults;
    }
  },
});

// Generate sample activity for testing
export const generateSampleActivity = mutation({
  args: { count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const count = args.count || 10;
    const types = ["password_check", "breach_check", "tip_added", "security_scan"];
    const severities = ["info", "success", "warning"];
    const actions = [
      "Password strength analyzed",
      "Breach database checked",
      "Security tip viewed",
      "Security scan completed",
      "2FA setup initiated",
      "Password updated",
      "Account settings reviewed",
      "Security audit performed",
    ];
    
    const inserted = [];
    
    for (let i = 0; i < count; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      
      const id = await ctx.db.insert("activityLog", {
        type: randomType,
        action: randomAction,
        details: `Automated test activity #${i + 1}`,
        severity: randomSeverity,
        metadata: { test: true, index: i },
        timestamp: Date.now() - (count - i) * 1000, // Stagger timestamps
      });
      
      inserted.push(id);
    }
    
    return {
      success: true,
      count: inserted.length,
      message: `Generated ${inserted.length} sample activities`
    };
  },
});


