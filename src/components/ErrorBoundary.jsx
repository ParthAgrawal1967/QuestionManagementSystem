import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8 max-w-md">

            <div className="flex justify-center items-center mb-4">
              <Icon name="AlertTriangle" size={42} color="#ef4444" />
            </div>

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-medium text-neutral-800">
                Something went wrong
              </h1>
              <p className="text-neutral-600 text-base w-8/12 mx-auto">
                We encountered an unexpected error while processing your request.
              </p>
            </div>

            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => window.location.href = "/"}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Icon name="ArrowLeft" size={18} color="#fff" />
                Back to Home
              </button>
            </div>

          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
