import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AppShell } from './components/layout/AppShell';

// Mock Home Page for Phase 4 Demo
const DashboardMock = () => (
    <div className="max-w-4xl">
        <h2 className="text-3xl font-light mb-6">Season Strategy: <span className="font-normal text-white">SS26 High Summer</span></h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard label="Budget Utilized" value="$450k / $1.2M" />
            <StatCard label="SKU Count" value="12 / 85" />
            <StatCard label="Avg Margin" value="62%" trend="up" />
        </div>

        <div className="p-6 border border-stone-800 rounded bg-stone-950/50">
            <h3 className="text-sm font-mono text-stone-500 mb-4">ACTIVE ALERTS</h3>
            <div className="flex items-center gap-4 text-amber-400 text-sm">
                <span>⚠</span>
                <span>Line Plan is missing 3 "Entry Price" items in Accessories.</span>
            </div>
        </div>
    </div>
);

const StatCard = ({ label, value, trend }: any) => (
    <div className="p-6 bg-stone-950 border border-stone-800 rounded">
        <div className="text-xs text-stone-500 uppercase mb-2">{label}</div>
        <div className="text-2xl font-light">{value}</div>
        {trend === 'up' && <div className="text-xs text-emerald-500 mt-1">↑ Above Target</div>}
    </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-500">Loading...</div>;
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <AppShell>
                        <DashboardMock />
                    </AppShell>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
