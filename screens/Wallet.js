import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as walletActions from '../store/walletActions';
import Colors from '../constants/Colors';
import HeaderBtn from '../components/UI/HeaderBtn';
import AddOrEditSenstiveData from '../containers/AddOrEditSenstiveDataModal';
import WalletItem from '../containers/WalletItem';

const Wallet = (props) => {
  const walletList = useSelector((state) => state.senstiveDataList);
  const walletKey = useSelector((state) => state.walletKey);
  const generatedPass = useSelector((state) => state.generatedPass);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemId, setItemId] = useState('');
  const [title, setTitle] = useState('');
  const [senstiveData, setSenstiveData] = useState(
    generatedPass ? generatedPass : ''
  );
  const [detial, setDetial] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (generatedPass) {
      setShowModal(true);
    }
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            title='add new'
            iconName='plus'
            onPress={() => setShowModal(true)}
          />
        </HeaderButtons>
      ),
    });
    return () => dispatch(walletActions.resetState());
  }, []);

  useEffect(() => {
    try {
      dispatch(walletActions.setData(walletKey));
    } catch (err) {
      Alert.alert('حدثة مشكلة', err.message, [{ text: 'إغلاق' }]);
    }
  }, [dispatch]);

  const hideModal = () => {
    if (!editMode) {
      dispatch(walletActions.cancelSaveGeneratedPass());
    }
    setItemId('');
    setTitle('');
    setSenstiveData('');
    setDetial('');
    setShowModal(false);
    setEditMode(false);
  };

  const onEditItemHandler = (id) => {
    const item = walletList.find((d) => d.id === id);
    setItemId(item.id);
    setTitle(item.title);
    setSenstiveData(item.data);
    setDetial(item.detial);
    setShowModal(true);
    setEditMode(true);
  };

  const onChangeHandler = (identifier, inputText) => {
    if (identifier === 'title') {
      setTitle(inputText);
    } else if (identifier === 'detial') {
      setDetial(inputText);
    } else {
      setSenstiveData(inputText);
    }
  };

  const onSaveHandler = () => {
    try {
      if (editMode) {
        dispatch(
          walletActions.updateData(
            walletKey,
            itemId,
            title,
            senstiveData,
            detial
          )
        );
      } else {
        dispatch(
          walletActions.saveData(walletKey, title, senstiveData, detial)
        );
      }
    } catch (err) {
      Alert.alert('حدثة مشكلة', err.message, [{ text: 'إغلاق' }]);
    }

    hideModal();
  };

  const ListEmpty = (
    <View style={styles.msgContainer}>
      <Text style={styles.msg}>لاتوجد بيانات حتى الأن</Text>
    </View>
  );

  return (
    <>
      <AddOrEditSenstiveData
        visible={showModal}
        editMode={editMode}
        id={itemId}
        title={title}
        senstiveData={senstiveData}
        detial={detial}
        hideModal={hideModal}
        onChange={onChangeHandler}
        save={onSaveHandler}
      />

      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={walletList}
        renderItem={(itemData) => (
          <WalletItem
            title={itemData.item.title}
            password={itemData.item.data}
            detial={itemData.item.detial}
            id={itemData.item.id}
            onEdit={onEditItemHandler}
          />
        )}
        ListEmptyComponent={ListEmpty}
      />
    </>
  );
};

const styles = StyleSheet.create({
  msgContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: { fontSize: 23, fontWeight: 'bold', color: Colors.titleText },
});

export default Wallet;
