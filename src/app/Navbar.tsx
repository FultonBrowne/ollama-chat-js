import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex rounded-lg items-center justify-center flex-wrap bg-slate-800 p-4 text-white text-lg">
            Ollama Playground
            
        </nav>
    );
}

export default Navbar;