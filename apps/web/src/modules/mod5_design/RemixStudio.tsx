import React, { useState } from 'react';

// Inputs
const MOCK_SKETCH = 'https://placeholder.com/sketch_bw.png';
const FABRICS = [
    { id: 'f1', name: 'Red Velvet', hex: '#8B0000' },
    { id: 'f2', name: 'Denim Wash', hex: '#3b82f6' },
    { id: 'f3', name: 'Floral Silk', hex: '#fbbf24' },
];

export const RemixStudio = () => {
    const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleRemix = () => {
        if (!selectedFabric) return;
        setIsGenerating(true);

        // Simulate AI Latency
        setTimeout(() => {
            setResult('https://placeholder.com/remix_output.png');
            setIsGenerating(false);
        }, 2500);
    };

    return (
        <div className="h-full flex gap-4">
            {/* LEFT: Canvas */}
            <div className="flex-1 bg-stone-900 rounded-lg p-6 flex flex-col items-center justify-center border border-stone-800 relative">
                <h3 className="absolute top-4 left-4 text-xs font-mono text-stone-500 uppercase">Input: Sketch (REAL)</h3>
                <img src={MOCK_SKETCH} alt="Sketch" className="max-h-96 opacity-80 invert" />

                {/* Overlay Result */}
                {result && (
                    <div className="absolute inset-0 bg-stone-900 p-6 flex items-center justify-center animate-fade-in">
                        <h3 className="absolute top-4 left-4 text-xs font-mono text-blue-400 uppercase">Output: REMIX (DERIVED)</h3>
                        <img src={result} alt="Result" className="max-h-96 shadow-2xl shadow-blue-900/20" />
                        <button onClick={() => setResult(null)} className="absolute bottom-4 text-xs text-stone-500 hover:text-white">
                            Reset
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT: Controls */}
            <div className="w-80 bg-stone-950 border-l border-stone-800 p-6 flex flex-col">
                <h2 className="text-lg font-light mb-6">Remix Station</h2>

                <div className="mb-8">
                    <label className="text-xs text-stone-500 uppercase mb-3 block">Select Material</label>
                    <div className="grid grid-cols-2 gap-3">
                        {FABRICS.map(fab => (
                            <button
                                key={fab.id}
                                onClick={() => setSelectedFabric(fab.id)}
                                className={`p-3 rounded border text-left transition-all ${selectedFabric === fab.id
                                        ? 'border-blue-500 bg-blue-900/10'
                                        : 'border-stone-800 hover:border-stone-600'
                                    }`}
                            >
                                <div className="w-full h-8 rounded mb-2" style={{ backgroundColor: fab.hex }} />
                                <div className="text-xs font-medium">{fab.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleRemix}
                    disabled={!selectedFabric || isGenerating}
                    className={`mt-auto w-full py-4 rounded font-medium flex items-center justify-center gap-2 ${!selectedFabric ? 'bg-stone-800 text-stone-500' :
                            isGenerating ? 'bg-blue-600 animate-pulse text-white' :
                                'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                >
                    {isGenerating ? (
                        <><span>⚡ REMIXING...</span></>
                    ) : (
                        <><span>✨ GENERATE VARIATION</span></>
                    )}
                </button>

                <p className="text-center mt-4 text-[10px] text-stone-600">
                    Powered by Stable Diffusion XL • Cost: ~$0.04
                </p>
            </div>
        </div>
    );
};
