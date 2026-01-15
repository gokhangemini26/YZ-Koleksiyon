import React from 'react';

export const LinePlanGrid = () => {
    // Mock Data
    const categories = ['Dresses', 'Tops', 'Bottoms', 'Outerwear'];
    const pricePoints = ['Entry ($50-$100)', 'Core ($100-$200)', 'Premium ($200+)'];

    return (
        <div className="p-6 bg-stone-900 rounded-lg border border-stone-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-light text-white">Collection Architecture</h3>
                <button className="bg-white text-black px-4 py-2 rounded text-sm hover:bg-gray-200">
                    + Add Category
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-stone-700 text-stone-400 font-mono text-sm">CATEGORY</th>
                            {pricePoints.map(pp => (
                                <th key={pp} className="p-4 border-b border-stone-700 text-stone-400 font-mono text-sm">
                                    {pp}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat} className="group hover:bg-stone-800/50 transition-colors">
                                <td className="p-4 border-b border-stone-800 font-medium text-stone-200">
                                    {cat}
                                </td>
                                {pricePoints.map(pp => (
                                    <td key={pp} className="p-4 border-b border-stone-800">
                                        {/* The "Slot" */}
                                        <div className="h-24 border-2 border-dashed border-stone-700 rounded flex flex-col items-center justify-center text-stone-600 hover:border-stone-500 hover:text-stone-400 cursor-pointer transition-all">
                                            <span className="text-2xl font-thin">+</span>
                                            <span className="text-xs">Add SKU</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
