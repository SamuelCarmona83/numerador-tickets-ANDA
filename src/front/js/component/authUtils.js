export const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado");
        throw new Error("Token no encontrado");
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Token inválido o expirado");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la validación del token:", error);
        throw error;
    }
};