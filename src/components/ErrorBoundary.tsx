"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { components, typography } from "@/lib/designTokens";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className={`${components.card.elevated} max-w-2xl w-full`}>
            <CardContent className="p-8 text-center">
              <div
                className={`w-20 h-20 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-6`}
              >
                <AlertTriangle
                  className={`w-10 h-10 ${components.icon.accent}`}
                />
              </div>

              <h1 className={`${typography.h3} text-foreground mb-3`}>
                Nešto je pošlo po krivu
              </h1>

              <p className={`${typography.body} text-muted-foreground mb-6`}>
                Došlo je do neočekivane greške. Pokušajte osvježiti stranicu ili
                se vratite na početnu.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="mb-6 p-4 bg-muted rounded-lg text-left overflow-auto max-h-48">
                  <p className="text-sm font-mono text-red-600 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReset}
                  className={components.button.primary}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Osvježi stranicu
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className={components.button.secondary}
                >
                  Povratak na početnu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
