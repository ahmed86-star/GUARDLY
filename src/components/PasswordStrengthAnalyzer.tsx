import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff,
} from "lucide-react";

interface PasswordStrengthAnalyzerProps {
  onStrengthChange?: (strength: number) => void;
  initialPassword?: string;
  className?: string;
}

const PasswordStrengthAnalyzer = ({
  onStrengthChange = () => {},
  initialPassword = "",
  className = "",
}: PasswordStrengthAnalyzerProps) => {
  const [password, setPassword] = useState(initialPassword);
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback(["Enter a password to check its strength"]);
      onStrengthChange(0);
      return;
    }

    // Simple password strength algorithm
    let score = 0;
    const newFeedback: string[] = [];

    // Length check
    if (password.length < 8) {
      newFeedback.push("Password is too short (minimum 8 characters)");
    } else {
      score += 20;
    }

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20;
    else newFeedback.push("Add uppercase letters");

    if (/[a-z]/.test(password)) score += 20;
    else newFeedback.push("Add lowercase letters");

    if (/[0-9]/.test(password)) score += 20;
    else newFeedback.push("Add numbers");

    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    else newFeedback.push("Add special characters");

    // If score is high but feedback is empty, add a positive message
    if (score > 80 && newFeedback.length === 0) {
      newFeedback.push("Strong password! Good job!");
    } else if (score > 60 && newFeedback.length <= 1) {
      newFeedback.push("Good password, but could be improved");
    }

    setStrength(score);
    setFeedback(
      newFeedback.length ? newFeedback : ["Enter a stronger password"],
    );
    onStrengthChange(score);
  }, [password, onStrengthChange]);

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get strength label
  const getStrengthLabel = () => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Moderate";
    return "Strong";
  };

  // Get icon based on strength
  const getStrengthIcon = () => {
    if (strength < 40)
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (strength < 70) return <Info className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClear = () => {
    setPassword("");
  };

  return (
    <div className={cn("bg-card p-6 rounded-lg shadow-md w-full", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Password Strength Analyzer</h3>
      </div>

      <div className="relative mb-4">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password to analyze"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">
            Strength: {getStrengthLabel()}
          </span>
          <span className="text-sm">{strength}%</span>
        </div>
        <Progress
          value={strength}
          className="h-2"
          indicatorClassName={getStrengthColor()}
        />
      </div>

      <div className="mb-4 bg-muted/50 p-3 rounded-md">
        <div className="flex items-start gap-2">
          {getStrengthIcon()}
          <div>
            <h4 className="font-medium text-sm">Feedback:</h4>
            <ul className="mt-1 space-y-1">
              {feedback.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyzer;
