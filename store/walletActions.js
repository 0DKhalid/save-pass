import { encrypt, decrypt } from '../util/encAndDec';
import {
  addData,
  fetchAll,
  deleteAll,
  deleteOne,
  updateOne,
} from '../db/walletDB';

export const SET_WALLET_KEY = 'SET_WALLET_KEY';
export const SAVE_DATA = 'SAVE_DATA';
export const SET_DATA = 'SET_DATA';
export const RESET_DB = 'RESET_DB';
export const RESET_STATE = 'RESET_STATE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SAVE_GENERATED_PASSWORD = 'SAVE_GENERATED_PASSWORD';
export const CANCEL_SAVE_GENERATED_PASSWORD = 'CANCEL_SAVE_GENERATED_PASSWORD';
export const SEARCHED_ITEM_INDEX = 'SEARCHED_ITEM_INDEX';





export const setWalletKey = (walletKey) => {
  return {
    type: SET_WALLET_KEY,
    walletKey,
  };
};


export const searchForItem = (title) => {
  return{
    type: SEARCHED_ITEM_INDEX,
    itemTitle: title
  }
}


export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

export const saveData = (key, title, senstiveData, detial) => {
  return async (dispatch) => {
    try {
      const encryptedTitle = encrypt(key, title);
      const encryptedSenstiveData = encrypt(key, senstiveData);
      const encryptedDetial = encrypt(key, detial);
      const result = await addData(
        encryptedTitle,
        encryptedSenstiveData,
        encryptedDetial
      );
      dispatch({
        type: SAVE_DATA,
        newData: {
          id: result.insertId.toString(),
          title,
          data: senstiveData,
          detial,
        },
      });
    } catch (err) {
      throw new Error(
        'حدث خطأ أثناء حفظ البيانات تأكد من تعبأة البيانات كاملة'
      );
    }
  };
};

export const updateData = (key, id, title, data, detial) => {
  return async (dispatch) => {
    try {
      const encryptedUpdatedTitle = encrypt(key, title);
      const encryptedUpdatedData = encrypt(key, data);
      const encryptedUpdatedDetial = encrypt(key, detial);
      await updateOne(
        id,
        encryptedUpdatedTitle,
        encryptedUpdatedData,
        encryptedUpdatedDetial
      );

      dispatch({ type: UPDATE_ITEM, updatedData: { id, title, data, detial } });
    } catch (err) {
      throw new Error(
        'حدث خطأ أثناء تحديث البيانات تأكد من تعبأة البيانات كاملة'
      );
    }
  };
};

export const saveGeneratedPass = (password) => {
  return {
    type: SAVE_GENERATED_PASSWORD,
    password,
  };
};

export const cancelSaveGeneratedPass = () => {
  return {
    type: CANCEL_SAVE_GENERATED_PASSWORD,
  };
};

export const removeData = (id) => {
  return async (dispatch) => {
    try {
      await deleteOne(id);

      dispatch({ type: DELETE_ITEM, id });
    } catch (err) {
      throw new Error('حدث خطأ أثناء الحذف');
    }
  };
};

export const setData = (key) => {
  return async (dispatch) => {
    try {
      const result = await fetchAll();
      const finalResult = result.rows._array.map((data) => ({
        id: data.id.toString(),
        title: decrypt(key, data.title),
        data: decrypt(key, data.data),
        detial: decrypt(key, data.detial),
      }));
      dispatch({ type: SET_DATA, data: finalResult });
    } catch (err) {
      throw new Error(
        'حدث خطأ أثناء جلب البيانات إذا تكرر معك هذا الخطأ قم بإغلاق التطبيق وفتحه مره اخرى'
      );
    }
  };
};

export const resetDB = () => {
  return async (dispatch) => {
    try {
      await deleteAll();
    } catch (err) {
      throw new Error('حدث خطأ أثناء محاولة حذف الحافظة القديمة');
    }

    dispatch({ type: RESET_DB });
  };
};
