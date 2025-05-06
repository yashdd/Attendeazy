import React from "react";

const Tp = () => {
    const [toggle, setToggle] = React.useState(false);

    const handleChange = (e) => {
        setToggle(!toggle);
    }
    
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Toggle Example</h1>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" className="hidden" checked={toggle} onChange={handleChange} />
                    <div className={`block bg-gray-600 w-14 h-8 rounded-full ${toggle ? 'bg-green-500' : ''}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${toggle ? 'transform translate-x-full' : ''}`}></div>
                </div>
                <span className="ml-3 text-gray-700">{toggle ? "On" : "Off"}</span>
            </label>
        </div>
    );
    
}
export default Tp;
