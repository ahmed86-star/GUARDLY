import React, { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PasswordStrength {
  score: number;
  strength: string;
  checks: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
    isLongEnough: boolean;
  };
  suggestions: string[];
}

const PasswordStrengthAnalyzerConvex = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<PasswordStrength | null>(null);
  
  const saveAnalysis = useMutation(api.passwordAnalyses.saveAnalysis);
  const logActivity = useMutation(api.activityLog.logActivity);

  const analyzePassword = (pwd: string): PasswordStrength => {
    const checks = {
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasNumbers: /\d/.test(pwd),
      hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      isLongEnough: pwd.length >= 12,
    };

    const checksPassed = Object.values(checks).filter(Boolean).length;
    let score = 0;
    let strength = "weak";
    const suggestions: string[] = [];

    // Calculate score
    if (checks.hasUppercase) score += 15;
    if (checks.hasLowercase) score += 15;
    if (checks.hasNumbers) score += 15;
    if (checks.hasSpecialChars) score += 20;
    
    // Length scoring
    if (pwd.length >= 8) score += 10;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;
    if (pwd.length >= 20) score += 5;

    // Determine strength
    if (score < 30) {
      strength = "weak";
    } else if (score < 60) {
      strength = "medium";
    } else if (score < 80) {
      strength = "strong";
    } else {
      strength = "very-strong";
    }

    // Generate suggestions
    if (!checks.hasUppercase) suggestions.push("Add uppercase letters");
    if (!checks.hasLowercase) suggestions.push("Add lowercase letters");
    if (!checks.hasNumbers) suggestions.push("Add numbers");
    if (!checks.hasSpecialChars) suggestions.push("Add special characters");
    if (!checks.isLongEnough) suggestions.push("Use at least 12 characters");
    if (pwd.length < 16) suggestions.push("Consider making it longer for better security");

    return { score, strength, checks, suggestions };
  };

  useEffect(() => {
    if (password.length > 0) {
      const result = analyzePassword(password);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  const handleSaveAnalysis = async () => {
    if (!analysis) return;

    try {
      await saveAnalysis({
        strength: analysis.strength,
        score: analysis.score,
        hasUppercase: analysis.checks.hasUppercase,
        hasLowercase: analysis.checks.hasLowercase,
        hasNumbers: analysis.checks.hasNumbers,
        hasSpecialChars: analysis.checks.hasSpecialChars,
        length: password.length,
        suggestions: analysis.suggestions,
      });

      await logActivity({
        type: "password_check",
        action: "Password strength analyzed",
        details: `Strength: ${analysis.strength}, Score: ${analysis.score}/100`,
        severity: analysis.score >= 60 ? "success" : "warning",
        metadata: { score: analysis.score, strength: analysis.strength },
      });

      // Visual feedback
      const button = document.getElementById("save-analysis-btn");
      if (button) {
        button.textContent = "✓ Saved!";
        setTimeout(() => {
          button.textContent = "Save to History";
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving analysis:", error);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "text-red-600 bg-red-50 dark:bg-red-950 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 border-yellow-200";
      case "strong":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950 border-blue-200";
      case "very-strong":
        return "text-green-600 bg-green-50 dark:bg-green-950 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950 border-gray-200";
    }
  };

  const getProgressColor = (score: number) => {
    if (score < 30) return "bg-red-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Strength Analyzer</CardTitle>
        <CardDescription>
          Analyze password strength and save to your security history
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password-input">Enter Password</Label>
          <div className="relative">
            <Input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password to analyze..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {analysis && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Strength Score</span>
                <Badge className={getStrengthColor(analysis.strength)}>
                  {analysis.strength.toUpperCase()} - {analysis.score}/100
                </Badge>
              </div>
              <div className="relative">
                <Progress value={analysis.score} className="h-3" />
                <div
                  className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressColor(analysis.score)}`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Security Checks</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(analysis.checks).map(([key, passed]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 text-sm p-2 rounded-md border ${
                      passed
                        ? "bg-green-50 dark:bg-green-950 border-green-200"
                        : "bg-red-50 dark:bg-red-950 border-red-200"
                    }`}
                  >
                    {passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="capitalize">
                      {key.replace("has", "").replace("is", "").replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {analysis.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  Suggestions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              id="save-analysis-btn"
              onClick={handleSaveAnalysis}
              className="w-full"
              variant="outline"
            >
              Save to History
            </Button>
          </>
        )}

        {!analysis && (
          <div className="text-center py-8 text-muted-foreground">
            <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Enter a password to analyze its strength</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordStrengthAnalyzerConvex;

