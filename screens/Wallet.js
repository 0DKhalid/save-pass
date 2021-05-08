import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  // AppState,
} from 'react-native';

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
  const searchedItemIndex = useSelector((state) => state.searchedItemIndex);
  const generatedPass = useSelector((state) => state.generatedPass);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemId, setItemId] = useState('');
  const [title, setTitle] = useState('');
  const [senstiveData, setSenstiveData] = useState(
    generatedPass ? generatedPass : ''
  );
  const [detial, setDetial] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);

  const dispatch = useDispatch();
  const flatList = useRef();

  const onSearchIconClickHandler = () => {
    setShowSearchBox((prevState) => !prevState);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
       showSearchBox && <TextInput
          returnKeyType='search'
          onSubmitEditing={onSearchHandler}
          style={[
            styles.searchInput,
          ]}
          placeholder='أدخل عنوان كلمة السر للبحث'
        />
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            title='search for item'
            iconName={!showSearchBox ? 'magnifying-glass' : 'cross'}
            onPress={onSearchIconClickHandler}
          />
          <Item
            title='add new'
            iconName='plus'
            onPress={() => setShowModal(true)}
          />
        </HeaderButtons>
      ),
    });
  }, [showSearchBox]);

  useEffect(() => {
    if (generatedPass) {
      setShowModal(true);
    }
    return () => dispatch(walletActions.resetState());
  }, []);

  useEffect(() => {
    try {
      dispatch(walletActions.setData(walletKey));
    } catch (err) {
      Alert.alert('حدثة مشكلة', err.message, [{ text: 'إغلاق' }]);
    }
  }, [dispatch]);

  useEffect(() => {
    if (walletList.length > 0 && searchedItemIndex !== -1) {
      flatList.current.scrollToIndex({
        index: searchedItemIndex,
        animated: true,
      });
    }
  }, [searchedItemIndex, walletList]);

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

  const onSearchHandler = (event) => {
    dispatch(walletActions.searchForItem(event.nativeEvent.text));
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
        ref={flatList}
        contentContainerStyle={{ flexGrow: 1 }}
        data={walletList}
        renderItem={(itemData) => (
          <WalletItem
            searchedItemIndex={searchedItemIndex}
            itemIndex={itemData.index}
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
  searchInput: {
    color: Colors.text,
    borderColor: Colors.bgColor,
    borderWidth: 1,
    padding: 2,
    paddingRight: 7,
    paddingLeft: 7,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 20,
  },
});

export default Wallet;
