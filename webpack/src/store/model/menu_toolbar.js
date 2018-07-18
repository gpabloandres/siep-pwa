// Modelo MenuToolBar

const module = {
  state: {
    title: "Siep"
  },
  mutations: {
    updateTitle(state,payload) {
      state.title = payload
    }
  }
};

export default module