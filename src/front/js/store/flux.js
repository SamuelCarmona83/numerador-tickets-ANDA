const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			sucursales: [
				'Artigas',
				'Bella unión',
				'Atlántida',
				'Canelones',
				'Ciudad de la costa',
				'Las piedras',
				'Pando',
				'Santa Lucía',
				'Salinas',
				'San Ramón',
				'Montevideo - Nuevo Centro Shopping',
				'Montevideo - Tres Cruces Shopping',
				'Montevideo - Arenal grande',
				'Montevideo - Portones Shopping',
			],
			user: null,
		},
		actions: {
			// funcion de registro de usuario
			signup: async (doc_id, name, email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ doc_id, name, email, password }),
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        return { success: false, message: data.msg || "Error al registrar usuario" };
                    }

                    return { success: true, message: "Usuario registrado exitosamente" };
                } catch (error) {
                    console.error("Error al registrar usuario:", error);
                    return { success: false, message: "Error inesperado al registrar usuario" };
                }
            },
			// funcion de login del usuario
			login: async (doc_id, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ doc_id, password }),
                    });

                    if (!response.ok) {
                        const data = await response.json();
                        return { success: false, message: data.msg || "Error al iniciar sesión" };
                    }

                    const data = await response.json();
                    localStorage.setItem("token", data.access_token); 
                    setStore({ user: data.user }); 
                    return { success: true, message: "Inicio de sesión exitoso" };
                } catch (error) {
                    console.log("Error al iniciar sesión:", error);
                    return { success: false, message: "Error inesperado al iniciar sesión" };
                }
            },
			//Traer info del usuario
			fetchUserData: async () => {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Token no encontrado" };
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
                    setStore({ user: data });
                    return { success: true, data };
                } catch (error) {
                    console.error("Error en la validación del token:", error);
                    setStore({ user: null });
                    return { success: false, message: "Token inválido o expirado" };
                }
            },

            // Logout del usuario
            logout: () => {
                localStorage.removeItem("token");
                setStore({ user: null });
            },
		}
	};
};

export default getState;
