import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  TrendingUp,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const LiveActivityFeed = () => {
  const activities = useQuery(api.activityLog.getRecentActivity, { limit: 15 });
  const stats = useQuery(api.activityLog.getActivityStats);
  const logActivity = useMutation(api.activityLog.logActivity);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate when new activities arrive
  useEffect(() => {
    if (activities && activities.length > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activities?.length]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "password_check":
        return <Lock className="h-4 w-4" />;
      case "breach_check":
        return <Shield className="h-4 w-4" />;
      case "tip_added":
        return <Info className="h-4 w-4" />;
      case "security_scan":
        return <Activity className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "error":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-3 w-3" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3" />;
      case "error":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Info className="h-3 w-3" />;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const simulateActivity = async () => {
    const types = ["password_check", "breach_check", "tip_added", "security_scan"];
    const actions = [
      "Password strength analyzed",
      "Breach database checked",
      "Security tip viewed",
      "Security scan completed",
      "2FA setup initiated",
      "Password updated",
    ];
    const severities = ["info", "success", "warning"];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

    await logActivity({
      type: randomType,
      action: randomAction,
      details: `Simulated activity for demonstration`,
      severity: randomSeverity,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <div>
              <CardTitle>Live Activity Feed</CardTitle>
              <CardDescription className="mt-1">
                Real-time security events
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={simulateActivity}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Simulate
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats Summary */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Events</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="text-2xl font-bold">{stats.last24Hours}</div>
              <div className="text-xs text-muted-foreground">Last 24h</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-1 text-2xl font-bold">
                <TrendingUp className="h-5 w-5 text-green-500" />
                {stats.last24Hours > 0 ? "Active" : "Quiet"}
              </div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>
        )}

        {/* Activity List */}
        <ScrollArea className="h-[400px] pr-4">
          {!activities && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-2 opacity-50 animate-pulse" />
              <p>Loading activity feed...</p>
            </div>
          )}
          
          {activities && activities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No activities yet</p>
              <p className="text-xs mt-1">Use the app to generate events!</p>
            </div>
          )}

          {activities && activities.length > 0 && (
            <div className="space-y-2">
              {activities.map((activity, index) => (
                <div
                  key={activity._id}
                  className={`
                    p-3 rounded-lg border transition-all duration-300
                    ${getSeverityColor(activity.severity)}
                    ${isAnimating && index === 0 ? "scale-105 animate-pulse" : ""}
                    hover:shadow-md
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {activity.action}
                        </span>
                        <Badge 
                          variant="outline" 
                          className="h-5 px-1.5 text-xs flex items-center gap-1"
                        >
                          {getSeverityIcon(activity.severity)}
                          {activity.severity}
                        </Badge>
                      </div>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {activity.details}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">{activity.type}</span>
                        <span>•</span>
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Top Activity Types */}
        {stats && stats.mostActive.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-2">Top Activity Types</h4>
            <div className="space-y-2">
              {stats.mostActive.map((item) => (
                <div
                  key={item.type}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    {getActivityIcon(item.type)}
                    <span className="font-mono text-xs">{item.type}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;


