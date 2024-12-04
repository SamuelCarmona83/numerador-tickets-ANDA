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

            selectedDate: ''
            logoUrl: "",
            token:"",

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
                const store = getStore();
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Token no encontrado" };
                }

                if (store.user) {
                    console.log("Usuario ya cargado:", store.user);
                    return { success: true, data: store.user };
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

            setSelectedDate: (date) => {
                setStore({ selectedDate: date });
                console.log(date)
              },
            getSelectedDate: () => {
                return getStore().selectedDate; 
            },
              


            // conectarse a API de cloudinary
            uploadImage: async (file) => {
				try {
					const formData = new FormData();
					formData.append("file", file);
					formData.append("upload_preset", "preset_agustin"); 

					const response = await fetch(
						"https://api.cloudinary.com/v1_1/ddw7ebpjg/image/upload",
						{
							method: "POST",
							body: formData,
						}
					);

					if (!response.ok) {
						throw new Error("Error al subir la imagen");
					}

					const data = await response.json();
					setStore({ logoUrl: data.secure_url }); 
					return { success: true, url: data.secure_url };
				} catch (error) {
					console.error("Error al subir la imagen:", error);
					return { success: false, message: error.message };
				}
			},
            // Traer el logo desde store
            getLogoUrl: () => {
				const store = getStore();
				return store.logoUrl;
			},

		}
	};
};

export default getState;
