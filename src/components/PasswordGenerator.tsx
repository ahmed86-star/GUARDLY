import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface PasswordGeneratorProps {
  onPasswordGenerated?: (password: string) => void;
  defaultLength?: number;
  defaultOptions?: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

const PasswordGenerator = ({
  onPasswordGenerated = () => {},
  defaultLength = 12,
  defaultOptions = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  },
}: PasswordGeneratorProps) => {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(defaultLength);
  const [options, setOptions] = useState(defaultOptions);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate password on component mount and when options change
  useEffect(() => {
    generatePassword();
  }, [passwordLength, options]);

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Ensure at least one character set is selected
    if (charset === "") {
      charset = "abcdefghijklmnopqrstuvwxyz";
      setOptions({ ...options, lowercase: true });
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    onPasswordGenerated(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md w-full h-full flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Password Generator</h2>

      <div className="relative">
        <Input
          value={password}
          readOnly
          className="pr-20 font-mono text-sm bg-muted"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={generatePassword}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate new password</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">
              Password Length: {passwordLength}
            </label>
          </div>
          <Slider
            value={[passwordLength]}
            min={6}
            max={32}
            step={1}
            onValueChange={(value) => setPasswordLength(value[0])}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={() => handleOptionChange("uppercase")}
            />
            <label
              htmlFor="uppercase"
              className="text-sm font-medium cursor-pointer"
            >
              Uppercase (A-Z)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={() => handleOptionChange("lowercase")}
            />
            <label
              htmlFor="lowercase"
              className="text-sm font-medium cursor-pointer"
            >
              Lowercase (a-z)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="numbers"
              checked={options.numbers}
              onCheckedChange={() => handleOptionChange("numbers")}
            />
            <label
              htmlFor="numbers"
              className="text-sm font-medium cursor-pointer"
            >
              Numbers (0-9)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="symbols"
              checked={options.symbols}
              onCheckedChange={() => handleOptionChange("symbols")}
            />
            <label
              htmlFor="symbols"
              className="text-sm font-medium cursor-pointer"
            >
              Symbols (!@#$)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <Button className="w-full" onClick={generatePassword}>
          Generate New Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
