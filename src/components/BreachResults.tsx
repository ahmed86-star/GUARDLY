import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Globe,
  Info,
} from "lucide-react";

interface BreachData {
  name: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  pwnCount: number;
}

interface BreachResultsProps {
  email?: string;
  isLoading?: boolean;
  breaches?: BreachData[];
  error?: string;
  status?: "idle" | "loading" | "success" | "error";
}

const BreachResults: React.FC<BreachResultsProps> = ({
  email = "user@example.com",
  isLoading = false,
  breaches = [
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
  ],
  error = "",
  status = "success",
}) => {
  if (isLoading || status === "loading") {
    return (
      <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="animate-pulse h-8 w-8 rounded-full bg-blue-200 dark:bg-blue-700"></div>
            <p className="text-gray-500 dark:text-gray-400">
              Checking for breaches...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || status === "error") {
    return (
      <Alert
        variant="destructive"
        className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error ||
            "There was an error checking for breaches. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (breaches && breaches.length > 0) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <CardTitle className="text-xl font-bold text-red-600 dark:text-red-400">
              Breach Alert
            </CardTitle>
          </div>
          <CardDescription>
            <span className="font-medium">{email}</span> was found in{" "}
            {breaches.length} data{" "}
            {breaches.length === 1 ? "breach" : "breaches"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-600 dark:text-amber-400">
                Action Required
              </AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                We recommend changing your passwords for these services
                immediately and enabling two-factor authentication where
                available.
              </AlertDescription>
            </Alert>

            <Accordion type="single" collapsible className="w-full">
              {breaches.map((breach, index) => (
                <AccordionItem key={index} value={`breach-${index}`}>
                  <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-700 px-4 rounded-md">
                    <div className="flex items-center gap-3 text-left">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-red-500 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{breach.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {breach.domain}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 pl-12">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Breach date: {breach.breachDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Affected accounts: {breach.pwnCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm">{breach.description}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">
                          Compromised data:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {breach.dataClasses.map((dataClass, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                            >
                              {dataClass}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="pt-2">
              <h3 className="font-medium mb-3">Recommended actions:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mt-0.5">
                    <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span>
                    Change your password for all affected services immediately
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mt-0.5">
                    <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span>Use a unique password for each online account</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mt-0.5">
                    <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span>Enable two-factor authentication where available</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No breaches found
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
            <ShieldCheck className="h-8 w-8 text-green-500 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-medium text-green-600 dark:text-green-400">
            Good news!
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300">
            <span className="font-medium">{email}</span> was not found in any
            known data breaches.
          </p>
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mt-4">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-600 dark:text-blue-400">
              Stay Protected
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Even though your email wasn't found in any breaches, it's still a
              good practice to use strong, unique passwords and enable
              two-factor authentication.
            </AlertDescription>
          </Alert>
          <Button variant="outline" className="mt-4">
            Check another email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreachResults;
