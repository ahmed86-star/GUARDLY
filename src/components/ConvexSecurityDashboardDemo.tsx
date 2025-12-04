import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  AlertTriangle,
  TrendingUp,
  Database,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Demo data (will be replaced with real Convex data)
const demoTips = [
  {
    _id: "1",
    title: "Use Strong, Unique Passwords",
    description: "Create passwords with at least 12 characters, mixing uppercase, lowercase, numbers, and special characters.",
    category: "password",
    priority: 5,
  },
  {
    _id: "2",
    title: "Enable Two-Factor Authentication (2FA)",
    description: "Add an extra layer of security by requiring a second form of verification when logging in.",
    category: "2fa",
    priority: 5,
  },
  {
    _id: "3",
    title: "Use a Password Manager",
    description: "Password managers securely store all your passwords and can generate strong, unique passwords.",
    category: "password",
    priority: 4,
  },
];

const demoAnalyses = [
  {
    _id: "1",
    strength: "weak",
    score: 25,
    hasUppercase: false,
    hasLowercase: true,
    hasNumbers: false,
    hasSpecialChars: false,
    length: 6,
    timestamp: Date.now() - 86400000 * 7,
  },
  {
    _id: "2",
    strength: "medium",
    score: 55,
    hasUppercase: true,
    hasLowercase: true,
    hasNumbers: true,
    hasSpecialChars: false,
    length: 10,
    timestamp: Date.now() - 86400000 * 5,
  },
  {
    _id: "3",
    strength: "strong",
    score: 78,
    hasUppercase: true,
    hasLowercase: true,
    hasNumbers: true,
    hasSpecialChars: true,
    length: 12,
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    _id: "4",
    strength: "very-strong",
    score: 95,
    hasUppercase: true,
    hasLowercase: true,
    hasNumbers: true,
    hasSpecialChars: true,
    length: 16,
    timestamp: Date.now() - 86400000,
  },
];

const ConvexSecurityDashboardDemo = () => {
  const [tips, setTips] = useState(demoTips);
  const [analyses, setAnalyses] = useState(demoAnalyses);

  const stats = {
    total: analyses.length,
    averageScore: Math.round(
      analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length
    ),
    strengthCounts: {
      weak: analyses.filter((a) => a.strength === "weak").length,
      medium: analyses.filter((a) => a.strength === "medium").length,
      strong: analyses.filter((a) => a.strength === "strong").length,
      "very-strong": analyses.filter((a) => a.strength === "very-strong")
        .length,
    },
  };

  const handleAddRandomTip = () => {
    const categories = ["password", "2fa", "phishing", "general"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const newTip = {
      _id: Date.now().toString(),
      title: `Custom Security Tip #${tips.length + 1}`,
      description: "This is a custom security tip added via the dashboard!",
      category: randomCategory,
      priority: Math.floor(Math.random() * 5) + 1,
    };

    setTips([...tips, newTip]);
  };

  const handleAddRandomAnalysis = () => {
    const strengths = ["weak", "medium", "strong", "very-strong"];
    const randomStrength =
      strengths[Math.floor(Math.random() * strengths.length)];

    const newAnalysis = {
      _id: Date.now().toString(),
      strength: randomStrength,
      score: Math.floor(Math.random() * 100),
      hasUppercase: Math.random() > 0.5,
      hasLowercase: Math.random() > 0.5,
      hasNumbers: Math.random() > 0.5,
      hasSpecialChars: Math.random() > 0.5,
      length: Math.floor(Math.random() * 20) + 6,
      timestamp: Date.now(),
    };

    setAnalyses([newAnalysis, ...analyses].slice(0, 5)); // Keep only last 5
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "password":
        return <Lock className="h-4 w-4" />;
      case "2fa":
        return <Shield className="h-4 w-4" />;
      case "phishing":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-blue-500";
      case "very-strong":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Alert about Convex setup */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Demo Mode - Convex Setup Required</AlertTitle>
        <AlertDescription>
          This is using demo data. To connect to Convex:
          <br />
          1. Open a WSL terminal
          <br />
          2. Run: <code className="bg-muted px-2 py-1 rounded">npx convex dev</code>
          <br />
          3. Follow the login prompts
          <br />
          4. The dashboard will automatically switch to real-time data!
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-500" />
            Security Dashboard (Demo)
          </h2>
          <p className="text-muted-foreground mt-1">
            Interactive demo - Try the buttons below!
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddRandomAnalysis} variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Add Analysis
          </Button>
          <Button onClick={handleAddRandomTip} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Add Tip
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tips.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total tips available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Password Analyses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total passwords analyzed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-500" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.averageScore}
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Password strength
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Priority Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Top Priority Security Tips
          </CardTitle>
          <CardDescription>
            Click "Add Tip" to add more tips!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tips.slice(0, 3).map((tip) => (
              <div
                key={tip._id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getCategoryIcon(tip.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{tip.title}</h4>
                      <Badge variant="secondary">
                        Priority {tip.priority}
                      </Badge>
                      <Badge variant="outline">{tip.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Password Analyses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Recent Password Analyses
          </CardTitle>
          <CardDescription>
            Latest password strength checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyses.map((analysis) => (
              <div
                key={analysis._id}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStrengthColor(analysis.strength)}>
                    {analysis.strength.toUpperCase()}
                  </Badge>
                  <span className="text-sm font-semibold">
                    Score: {analysis.score}/100
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${analysis.hasUppercase ? "bg-green-500" : "bg-red-500"}`}
                    />
                    Uppercase
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${analysis.hasLowercase ? "bg-green-500" : "bg-red-500"}`}
                    />
                    Lowercase
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${analysis.hasNumbers ? "bg-green-500" : "bg-red-500"}`}
                    />
                    Numbers
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${analysis.hasSpecialChars ? "bg-green-500" : "bg-red-500"}`}
                    />
                    Special Chars
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Length: {analysis.length} characters •{" "}
                  {new Date(analysis.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strength Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Password Strength Distribution
          </CardTitle>
          <CardDescription>Breakdown of password strengths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.strengthCounts).map(([strength, count]) => (
              <div key={strength} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize font-medium">{strength}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor(strength)}`}
                    style={{
                      width: `${(count / stats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvexSecurityDashboardDemo;


