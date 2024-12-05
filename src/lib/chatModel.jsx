export async function preguntar(pregunta, modelo) {
    const url = localStorage.getItem('URL_PETICION') || 'http://127.0.0.1:8000/panchobotapi/';
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: pregunta,
                model: modelo
            }),
        });

        if (!response.ok) {
            throw new Error("Error en la petición al servidor");
        }

        const data = await response.json();
        return data.answer; // Ajusta esto según la estructura de tu respuesta
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        throw error;
    }
}
