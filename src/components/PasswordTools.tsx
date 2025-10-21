import React, { useState } from "react";
import PasswordGenerator from "./PasswordGenerator";
import PasswordStrengthAnalyzer from "./PasswordStrengthAnalyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, KeyRound } from "lucide-react";

interface PasswordToolsProps {
  className?: string;
}

const PasswordTools = ({ className = "" }: PasswordToolsProps) => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handlePasswordGenerated = (password: string) => {
    setGeneratedPassword(password);
  };

  const handleStrengthChange = (strength: number) => {
    setPasswordStrength(strength);
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto bg-background p-6 rounded-lg shadow-md ${className}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <KeyRound className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Password Tools</h2>
      </div>

      <div className="md:hidden">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="analyzer">Strength Analyzer</TabsTrigger>
          </TabsList>
          <TabsContent value="generator" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <PasswordGenerator
                  onPasswordGenerated={handlePasswordGenerated}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analyzer" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <PasswordStrengthAnalyzer
                  initialPassword={generatedPassword}
                  onStrengthChange={handleStrengthChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <PasswordStrengthAnalyzer
              initialPassword={generatedPassword}
              onStrengthChange={handleStrengthChange}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Password Security Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Use a unique password for each of your important accounts</li>
          <li>
            • Aim for at least 12 characters with a mix of letters, numbers, and
            symbols
          </li>
          <li>
            • Consider using a password manager to securely store your
            credentials
          </li>
          <li>• Enable two-factor authentication whenever possible</li>
          <li>• Regularly update passwords for sensitive accounts</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordTools;
