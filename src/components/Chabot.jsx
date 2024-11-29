import React from "react";
import { Send } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { preguntar } from "../lib/chatModel";
import UrlEditor from "./Urleditor";

export default function Chabot({ selectedModel }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const messageEndRef = useRef(null); // Referencia para el último mensaje

    useEffect(() => {
        const chatForm = document.getElementById("chatForm");
        const messageInput = document.getElementById("messageInput");

        const handleSubmit = async (e) => {
            e.preventDefault();
            const userMessage = {
                text: messageInput.value,
                role: "user",
            };

            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // Bloquea el input y muestra el mensaje de carga
            setIsLoading(true);
            const loadingMessage = {
                text: "Escribiendo...",
                role: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, loadingMessage]);

            try {
                const respuesta = await preguntar(userMessage.text, selectedModel);
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1), // Elimina el mensaje de carga
                    { text: respuesta, role: "bot" },
                ]);

            } catch (error) {
                console.error("Error al obtener la respuesta del bot:", error);
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1), // Elimina el mensaje de carga
                    { text: "Hubo un problema al procesar tu solicitud.", role: "bot" },
                ]);
            }

            setIsLoading(false); // Desbloquea el input
            messageInput.value = ""; // Limpia el campo de entrada
        };

        // Agrega el evento
        chatForm.addEventListener("submit", handleSubmit);

        // Limpia el evento cuando el componente se desmonte o el efecto se actualice
        return () => {
            chatForm.removeEventListener("submit", handleSubmit);
        };
    }, [selectedModel]); 

    // Efecto para mover el scroll al final cuando los mensajes cambian
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className={`flex-1 flex  items-center  background flex-col ${messages.length > 0 ? 'justify-end' : 'justify-center'}`}>
            <div className={`flex flex-1 flex-col w-full max-w-[49rem] p-4 mt-12  ${messages.length == 0 ? 'hidden' : ''}
                p-4 py-8 rounded-xl mb-12
            ` 
        }>
                {messages.map((message, index) => (
                    <div key={index}
                        className={`flex items-center  mb-4 ${message.role === "bot" ? "justify-start" : "justify-end"
                            }`}
                    >
                        <div
                            className={`relative p-2 rounded-lg max-w-[80%] ${message.role === "bot" ? "bg-blue-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {message.index} {message.text}
                           {
                                message.role === "bot" && (
                                    <div class="absolute w-3 h-3 bg-blue-600 top-[6px] -left-[5px] transform rotate-45"></div>
                                )
                           }
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>
            <div className="
            flex 
            w-full 
            max-w-[49rem] 
            flex-col 
            mb-2
            ">

                <div className={`flex flex-col items-center mb-6 ${messages.length > 0 ? 'hidden' : ''}`}>
                    <h1 data-testid="app-title"
                        className="font-heading text-pretty text-center text-[29px] font-semibold tracking-tighter text-gray-900 sm:text-[32px] md:text-[46px]
                        dark:text-gray-100">
                        Enviame un mensaje para ayudarte :)
                
                    </h1>
                    <p className="text-center text-gray-600 text-sm dark:text-gray-300">
                        Soy un chatbot que te ayudará a resolver tus dudas, solo tienes que escribir tu pregunta y yo te responderé.
                    </p>
                </div>
                <div className={`flex-col flex items-center  ${messages.length > 0 ? 'w-full max-w-[49rem] fixed bottom-0 bg-white' : ''}
                    dark:bg-gray-900 dark:text-gray-100 bg-white
                `}>
                    <form id="chatForm" className={`w-full flex items-center  `} disabled={isLoading}>
                        <input
                            type="text"
                            id="messageInput"
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 h-10 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 bg-blue-600 text-white hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            <Send className="h-4 w-4" color="white" />
                            <span className="sr-only">Enviar mensaje</span>
                        </button>

                    </form>
                    {
                        (messages.length === 0) && <UrlEditor />
                    }
                    {messages.length > 0 && <Footer />}
                </div>

            </div>
        </div>
    );
}