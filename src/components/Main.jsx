import React from "react";
import Navbar from "./Navbar";
import Chabot from "./Chabot";
import Footer from "./Footer";
import '../App.css';
import { useState } from "react";

export default function Main() {
    const [selectedModel, setSelectedModel] = useState("gemeni"); // Estado para el modelo seleccionado

    // Función para manejar el cambio en el select del Navbar
    const handleModelChange = (newModel) => {
        setSelectedModel(newModel);
    };
    return (
        <div className=" w-full min-h-screen  flex   flex-col dark:bg-gray-900">
            <Navbar onModelChange={handleModelChange} />
            <Chabot selectedModel={selectedModel} />
        </div>
    );
}
