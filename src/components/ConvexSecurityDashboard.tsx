import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ConvexSecurityDashboard = () => {
  // Queries
  const securityTips = useQuery(api.securityTips.getAllTips);
  const topTips = useQuery(api.securityTips.getTopTips, { limit: 3 });
  const passwordStats = useQuery(api.passwordAnalyses.getStats);
  const recentAnalyses = useQuery(api.passwordAnalyses.getRecentAnalyses, {
    limit: 5,
  });

  // Mutations
  const seedTips = useMutation(api.seedData.seedSecurityTips);
  const seedAnalyses = useMutation(api.seedData.seedPasswordAnalyses);
  const addTip = useMutation(api.securityTips.addTip);

  const handleSeedData = async () => {
    try {
      const tipsResult = await seedTips();
      const analysesResult = await seedAnalyses();
      console.log("Seed results:", tipsResult, analysesResult);
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  const handleAddRandomTip = async () => {
    const categories = ["password", "2fa", "phishing", "general"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    await addTip({
      title: `Custom Tip ${Date.now()}`,
      description: "This is a custom security tip added via the dashboard!",
      category: randomCategory,
      priority: Math.floor(Math.random() * 5) + 1,
    });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-500" />
            Convex Security Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time security data powered by Convex
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSeedData} variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Seed Sample Data
          </Button>
          <Button onClick={handleAddRandomTip} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Add Random Tip
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
            <div className="text-3xl font-bold">
              {securityTips?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total tips in database
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
            <div className="text-3xl font-bold">
              {passwordStats?.total || 0}
            </div>
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
              {passwordStats?.averageScore || 0}
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
            Highest priority recommendations from Convex
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!topTips && (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Loading tips from Convex...</p>
            </div>
          )}
          {topTips && topTips.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No tips found. Click "Seed Sample Data" to add some!</p>
            </div>
          )}
          {topTips && topTips.length > 0 && (
            <div className="space-y-3">
              {topTips.map((tip) => (
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
          )}
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
            Latest password strength checks from Convex
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!recentAnalyses && (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Loading analyses from Convex...</p>
            </div>
          )}
          {recentAnalyses && recentAnalyses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>
                No analyses found. Click "Seed Sample Data" to add some!
              </p>
            </div>
          )}
          {recentAnalyses && recentAnalyses.length > 0 && (
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
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
                    Length: {analysis.length} characters • {" "}
                    {new Date(analysis.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strength Distribution */}
      {passwordStats && passwordStats.total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Password Strength Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of password strengths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(passwordStats.strengthCounts).map(
                ([strength, count]) => (
                  <div key={strength} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize font-medium">{strength}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(strength)}`}
                        style={{
                          width: `${(count / passwordStats.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConvexSecurityDashboard;


