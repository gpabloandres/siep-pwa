// Modelo User

const module = {
  state: {
    nombre_completo: "Pepe Galarza"
  },
  mutations: {
    update_nombre_completo(state,payload) {
      state.nombre_completo = payload
    }
  }
};

export default module