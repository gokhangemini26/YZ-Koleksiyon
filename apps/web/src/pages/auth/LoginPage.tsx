import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/auth/login', { email, password });
            login(res.data.access_token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 text-stone-100 font-sans p-4">
            <div className="w-full max-w-md p-8 bg-stone-900 border border-stone-800 rounded-lg shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-widest text-white mb-2">VIBE<span className="text-stone-500">ERP</span></h1>
                    <p className="text-stone-400">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-200 text-sm rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-stone-950 border border-stone-800 rounded focus:border-white focus:outline-none transition-colors text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-stone-950 border border-stone-800 rounded focus:border-white focus:outline-none transition-colors text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-white text-black font-bold rounded hover:bg-stone-200 transition-colors uppercase tracking-wide"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-stone-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};
