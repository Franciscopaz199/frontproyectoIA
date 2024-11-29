import React from "react";
import DarkModeToggle from "./Darkmode";

export default function Navbar({ onModelChange })  {
    const handleChange = (e) => {
        
        onModelChange(e.target.value); // Actualiza el modelo seleccionado en Main
      };
    

    return (
        <div className=" w-full h-16 flex items-center lg:justify-around justify-between px-4 pos fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 ">
            <div className="text-blue-800 text-2xl font-bold
                darl:text-blue-200 dark:text-blue-200
            ">PanchoBot</div>
            <div className="flex space-x-4">
                <div className="px-2 py-3 flex items-center space-x-2">
                    <DarkModeToggle />
                    <select id="modelSelect" className="w-auto h-10 px-3 py-2 rounded-md border bg-white autofocus focus:outline-none focus:ring-2 focus:ring-blue-500
                        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:focus:ring-gray-500 dark:focus:ring-opacity-75
                    " onChange={handleChange} >
                        <option value="gemeni">Gemini-1.5-flash</option>
                        <option value="gpt-4">GPT-4-mini</option>
                        <option value="panchobot">PanchoBot</option>
                    </select>
                </div>
            </div>
        </div>
    );
}