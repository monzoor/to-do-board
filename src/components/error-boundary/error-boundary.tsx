"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

// Define the props type
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Define the state type
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service console
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
