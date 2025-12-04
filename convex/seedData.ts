import { mutation } from "./_generated/server";

// Mutation to seed initial security tips
export const seedSecurityTips = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if tips already exist
    const existingTips = await ctx.db.query("securityTips").collect();
    if (existingTips.length > 0) {
      return { message: "Tips already seeded", count: existingTips.length };
    }

    const tips = [
      {
        title: "Use Strong, Unique Passwords",
        description: "Create passwords with at least 12 characters, mixing uppercase, lowercase, numbers, and special characters. Never reuse passwords across different accounts.",
        category: "password",
        priority: 5,
      },
      {
        title: "Enable Two-Factor Authentication (2FA)",
        description: "Add an extra layer of security by requiring a second form of verification when logging in. Use authenticator apps instead of SMS when possible.",
        category: "2fa",
        priority: 5,
      },
      {
        title: "Use a Password Manager",
        description: "Password managers securely store all your passwords and can generate strong, unique passwords for each account. They're much safer than reusing passwords.",
        category: "password",
        priority: 4,
      },
      {
        title: "Watch Out for Phishing Emails",
        description: "Be suspicious of unexpected emails asking for personal information. Check sender addresses carefully and never click suspicious links.",
        category: "phishing",
        priority: 5,
      },
      {
        title: "Keep Software Updated",
        description: "Regular updates patch security vulnerabilities. Enable automatic updates for your operating system, browsers, and applications.",
        category: "general",
        priority: 4,
      },
      {
        title: "Avoid Public Wi-Fi for Sensitive Tasks",
        description: "Public Wi-Fi networks are often unsecured. Use a VPN when accessing sensitive information on public networks.",
        category: "general",
        priority: 3,
      },
      {
        title: "Regular Security Audits",
        description: "Periodically review your account security settings, remove unused apps with account access, and check for data breaches.",
        category: "general",
        priority: 3,
      },
      {
        title: "Backup Important Data",
        description: "Regularly backup your important files to multiple locations. This protects against ransomware and hardware failure.",
        category: "general",
        priority: 4,
      },
      {
        title: "Be Careful What You Share Online",
        description: "Limit personal information shared on social media. This information can be used for social engineering attacks.",
        category: "general",
        priority: 3,
      },
      {
        title: "Use Biometric Authentication When Available",
        description: "Fingerprint and face recognition add extra security layers. Enable them on devices that support these features.",
        category: "2fa",
        priority: 3,
      },
    ];

    let insertedCount = 0;
    for (const tip of tips) {
      await ctx.db.insert("securityTips", {
        ...tip,
        createdAt: Date.now(),
      });
      insertedCount++;
    }

    return { message: "Security tips seeded successfully", count: insertedCount };
  },
});

// Mutation to add sample password analyses
export const seedPasswordAnalyses = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleAnalyses = [
      {
        strength: "weak",
        score: 25,
        hasUppercase: false,
        hasLowercase: true,
        hasNumbers: false,
        hasSpecialChars: false,
        length: 6,
        suggestions: ["Add uppercase letters", "Add numbers", "Make it longer"],
        timestamp: Date.now() - 86400000 * 7, // 7 days ago
      },
      {
        strength: "medium",
        score: 55,
        hasUppercase: true,
        hasLowercase: true,
        hasNumbers: true,
        hasSpecialChars: false,
        length: 10,
        suggestions: ["Add special characters", "Make it longer"],
        timestamp: Date.now() - 86400000 * 5, // 5 days ago
      },
      {
        strength: "strong",
        score: 78,
        hasUppercase: true,
        hasLowercase: true,
        hasNumbers: true,
        hasSpecialChars: true,
        length: 12,
        suggestions: ["Consider making it even longer"],
        timestamp: Date.now() - 86400000 * 3, // 3 days ago
      },
      {
        strength: "very-strong",
        score: 95,
        hasUppercase: true,
        hasLowercase: true,
        hasNumbers: true,
        hasSpecialChars: true,
        length: 16,
        suggestions: [],
        timestamp: Date.now() - 86400000, // 1 day ago
      },
    ];

    let insertedCount = 0;
    for (const analysis of sampleAnalyses) {
      await ctx.db.insert("passwordAnalyses", analysis);
      insertedCount++;
    }

    return { message: "Sample analyses seeded successfully", count: insertedCount };
  },
});


