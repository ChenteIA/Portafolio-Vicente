import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "24px", textAlign: "center", background: "#0f131d", color: "#dee2f0", fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Algo salió mal</h1>
          <p style={{ opacity: 0.7 }}>Ocurrió un error inesperado. Intenta recargar la página.</p>
          <button onClick={() => window.location.reload()} style={{ background: "#ff6b00", color: "#fff", border: "none", borderRadius: "12px", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
            Recargar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
