import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can log the error or perform any custom error handling here
    console.error('Error caught by error boundary:', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI when an error occurs
      return <div>Error occurred. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
