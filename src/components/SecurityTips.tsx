import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  Fingerprint,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SecurityTip {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
}

const SecurityTips = () => {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const securityTips: SecurityTip[] = [
    {
      id: 1,
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Enable Two-Factor Authentication",
      description:
        "Add an extra layer of security to your accounts by requiring a second form of verification.",
      steps: [
        "Go to your account security settings",
        "Look for 'Two-Factor Authentication' or '2FA' options",
        "Follow the setup process (usually involves your phone)",
        "Save backup codes in a secure location",
      ],
    },
    {
      id: 2,
      icon: <Lock className="h-8 w-8 text-green-500" />,
      title: "Use a Password Manager",
      description:
        "Store and generate unique passwords for all your accounts without having to remember them.",
      steps: [
        "Choose a reputable password manager (Bitwarden, LastPass, 1Password)",
        "Install the browser extension and/or mobile app",
        "Create a strong master password",
        "Gradually add your accounts to the manager",
      ],
    },
    {
      id: 3,
      icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
      title: "Beware of Phishing Attempts",
      description:
        "Learn to identify suspicious emails and messages that try to steal your information.",
      steps: [
        "Check sender email addresses carefully",
        "Be suspicious of urgent requests for personal information",
        "Don't click links in emails you weren't expecting",
        "When in doubt, contact the company directly through their official website",
      ],
    },
    {
      id: 4,
      icon: <Fingerprint className="h-8 w-8 text-purple-500" />,
      title: "Keep Software Updated",
      description:
        "Regular updates patch security vulnerabilities that hackers can exploit.",
      steps: [
        "Enable automatic updates when possible",
        "Check for updates weekly if not automatic",
        "Don't postpone security updates",
        "Update all devices (computers, phones, routers, etc.)",
      ],
    },
    {
      id: 5,
      icon: <Smartphone className="h-8 w-8 text-red-500" />,
      title: "Secure Your Mobile Devices",
      description:
        "Your phone contains a wealth of personal information that needs protection.",
      steps: [
        "Use a strong PIN or biometric lock",
        "Enable remote tracking and wiping features",
        "Only install apps from official app stores",
        "Review app permissions regularly",
      ],
    },
    {
      id: 6,
      icon: <Key className="h-8 w-8 text-orange-500" />,
      title: "Create Strong, Unique Passwords",
      description:
        "Avoid using the same password across multiple sites to prevent widespread account compromise.",
      steps: [
        "Use at least 12 characters",
        "Include numbers, symbols, and mixed case letters",
        "Avoid personal information or common words",
        "Use a different password for each important account",
      ],
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentTipIndex(
          (prevIndex) => (prevIndex + 1) % securityTips.length,
        );
      }, 5000); // Rotate every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRotate, securityTips.length]);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const toggleExpandTip = (id: number) => {
    setExpandedTip(expandedTip === id ? null : id);
    if (autoRotate) setAutoRotate(false); // Stop auto-rotation when a tip is expanded
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Security Tips</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAutoRotate}
          className="flex items-center gap-2"
        >
          {autoRotate ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Pause Rotation</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Auto Rotate</span>
            </>
          )}
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {securityTips.map((tip) => (
            <CarouselItem key={tip.id}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 rounded-full bg-muted">{tip.icon}</div>
                  <div>
                    <CardTitle>{tip.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {tip.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {expandedTip === tip.id && (
                    <div className="mt-2">
                      <h4 className="font-medium mb-2">
                        Implementation Steps:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {tip.steps.map((step, index) => (
                          <li key={index} className="text-sm">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpandTip(tip.id)}
                    className="ml-auto"
                  >
                    {expandedTip === tip.id ? "Show Less" : "Learn More"}
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static translate-y-0 left-0" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCurrentTipIndex(
                Math.floor(Math.random() * securityTips.length),
              );
            }}
            className="h-8 w-8 rounded-full"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Random tip</span>
          </Button>
          <CarouselNext className="relative static translate-y-0 right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default SecurityTips;
