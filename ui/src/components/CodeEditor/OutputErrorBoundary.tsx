import React from "react";
import { Button } from "../Button";

export default class OutputErrorBoundary extends React.Component<{
  children?: React.ReactNode;
}> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto border-l-4 border-red-500 whitespace-pre-wrap break-words">
            {String(this.state.error)}
          </pre>
          <div className="mt-4">
            <Button
              onClick={() => this.setState({ hasError: false, error: null })}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
