export default {
  namespace: 'preview',
  state: {
    previewList: [],
  },
  reducers: {
    addComponent(state, { payload }) {
      return {
        ...state,
        previewList: state.previewList.concat(payload),
      };
    },
    setComponent(state, { payload }) {
      return {
        ...state,
        previewList: [...payload],
      };
    },
  },
};
