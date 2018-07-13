// Modelo User

const module = {
  state: {
    nombre_completo: "Social User"
  },
  mutations: {
    update_nombre_completo(state,payload) {
      state.nombre_completo = payload
    }
  }
};

export default module