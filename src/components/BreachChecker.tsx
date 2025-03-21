import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Mail, Search, Info } from "lucide-react";
import BreachResults from "./BreachResults";

interface BreachData {
  name: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  pwnCount: number;
}

interface BreachCheckerProps {
  initialEmail?: string;
}

const BreachChecker: React.FC<BreachCheckerProps> = ({ initialEmail = "" }) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [breaches, setBreaches] = useState<BreachData[] | null>(null);
  const [error, setError] = useState<string>("");
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setStatus("error");
      return;
    }

    // Reset states
    setError("");
    setIsChecking(true);
    setStatus("loading");

    // Simulate API call to Have I Been Pwned
    // In a real implementation, this would be an actual API call
    setTimeout(() => {
      try {
        // Mock response - in a real app this would come from the API
        const mockBreaches =
          Math.random() > 0.5
            ? [
                {
                  name: "Adobe",
                  domain: "adobe.com",
                  breachDate: "2013-10-04",
                  description:
                    "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text.",
                  dataClasses: [
                    "Email addresses",
                    "Password hints",
                    "Passwords",
                    "Usernames",
                  ],
                  pwnCount: 153000000,
                },
                {
                  name: "LinkedIn",
                  domain: "linkedin.com",
                  breachDate: "2012-05-05",
                  description:
                    "In May 2016, LinkedIn had 164 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later.",
                  dataClasses: ["Email addresses", "Passwords"],
                  pwnCount: 164000000,
                },
              ]
            : [];

        setBreaches(mockBreaches);
        setStatus("success");
        setHasChecked(true);
      } catch (err) {
        setError("Failed to check for breaches. Please try again later.");
        setStatus("error");
      } finally {
        setIsChecking(false);
      }
    }, 1500); // Simulate network delay
  };

  const resetCheck = () => {
    setEmail("");
    setBreaches(null);
    setHasChecked(false);
    setStatus("idle");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold">
              Email Breach Checker
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Check if your email has been involved in a data breach
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasChecked ? (
            <div className="space-y-6">
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  We'll check if your email appears in known data breaches. Your
                  email is not stored or shared.
                </AlertDescription>
              </Alert>

              <form onSubmit={checkEmail} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      className="pl-10 bg-white dark:bg-gray-800"
                      disabled={isChecking}
                    />
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isChecking}
                >
                  {isChecking ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check for Breaches
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Powered by{" "}
                  <a
                    href="https://haveibeenpwned.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Have I Been Pwned database
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <BreachResults
                email={email}
                isLoading={isChecking}
                breaches={breaches || []}
                error={error}
                status={status}
              />

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={resetCheck}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/20"
                >
                  Check Another Email
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BreachChecker;
