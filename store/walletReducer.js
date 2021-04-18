import {
  SET_WALLET_KEY,
  SET_DATA,
  RESET_DB,
  SAVE_DATA,
  DELETE_ITEM,
  UPDATE_ITEM,
  SAVE_GENERATED_PASSWORD,
  CANCEL_SAVE_GENERATED_PASSWORD,
  RESET_STATE,
  SEARCHED_ITEM_INDEX,
} from './walletActions';

const initialState = {
  senstiveDataList: [],
  walletKey: '',
  generatedPass: '',
  searchedItemIndex: -1,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_WALLET_KEY:
      return {
        ...state,
        walletKey: action.walletKey,
      };

    case SET_DATA:
      return {
        ...state,
        senstiveDataList: action.data,
      };

    case SAVE_DATA:
      return {
        ...state,
        senstiveDataList: state.senstiveDataList.concat(action.newData),
        generatedPass: '',
      };
    case UPDATE_ITEM: {
      const { id, title, data, detial } = action.updatedData;
      const updatedDataList = state.senstiveDataList.map((d) =>
        d.id === id ? { id: d.id, title, data, detial } : d
      );

      return {
        ...state,
        senstiveDataList: updatedDataList,
      };
    }
    case DELETE_ITEM:
      return {
        ...state,
        senstiveDataList: state.senstiveDataList.filter(
          (d) => d.id !== action.id
        ),
      };

    case SAVE_GENERATED_PASSWORD:
      return {
        ...state,
        generatedPass: action.password,
      };

    case CANCEL_SAVE_GENERATED_PASSWORD:
      return {
        ...state,
        generatedPass: '',
      };

    case RESET_STATE:
      return initialState;

    case RESET_DB:
      return initialState;

    case SEARCHED_ITEM_INDEX: {
      const searchedItem = state.senstiveDataList.findIndex((data) =>
        data.title.toLowerCase().includes(action.itemTitle.toLowerCase())
      );

      return {
        ...state,
        searchedItemIndex: searchedItem,
      };
    }
    default:
      return state;
  }
};
