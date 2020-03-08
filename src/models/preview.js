import { findIndex } from 'lodash';

export default {
  namespace: 'preview',
  state: {
    previewData: [],
    seletedData: [],
  },
  effects: {
    *updatePreview({ seletedData, listData }, { call, put, select }) {
      const preview = yield select(({ preview }) => preview);

      const data = { ...preview.seletedData };
      let payload = Array.from(listData || preview.previewData);

      const index = findIndex(payload, ['uuid', data.uuid]);

      if (index !== -1) {
        payload.splice(index, 1, { ...data });
      }
      yield put({
        type: 'setComponent',
        payload
      })

      yield put({
        type: 'setSeletedData',
        payload: { ...seletedData }
      })
    }
  },
  reducers: {
    setComponent(state, { payload }) {
      return {
        ...state,
        previewData: [...payload],
      };
    },
    setSeletedData(state, { payload }) {
      return {
        ...state,
        seletedData: { ...payload },
      };
    },
  },
};
