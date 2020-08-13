/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import FindPass from '../containers/FindPass';
import CustomModal from '../components/UI/CustomModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomModal
          animationType='slide'
          visible={showModal}
          styleModal={styles.modal}
        >
          <ScrollView>
            <Text style={{ ...styles.title, ...styles.titleModal }}>
              ماهي الفكره؟
            </Text>
            <Text style={styles.detailModal}>
              عند كتابة كلمة مرور والتحقق منها يتم البحث في قاعدة بيانات تضم عدد
              كبير من كلمات المرور التي كانت ضحية للإختراق وتم كشفها من قبل
              المخترقين وكذلك تظهر عدد المرات التي تم العثور عليها.
            </Text>
            <Text style={{ ...styles.title, ...styles.titleModal }}>
              هل هو آمن البحث عن كلمة مرور؟ وكيف تتم عملية البحث؟
            </Text>
            <View>
              <Text style={styles.detailModal}>
                نعم، عملية البحث تتم بطريقة آمنه جدا بحيث أنه يتم تشفير كلمة
                المرور المُدخلة ويتم إرسال جزء صغير منها إلى قاعدة البيانات في
                جهة الخادم ومن ثم يتم البحث في قاعدة البيانات عن جميع كلمات
                المرور المشفرة التي يطابق جزء منها الجزء المرسل ويتم إستقبالها
                داخل التطبيق وتتم المقارنة كذلك داخل التطبيق{' '}
                <Text
                  style={{ ...styles.detailModal, ...{ fontWeight: 'bold' } }}
                >
                  يعني لاتخاف مافي مخلوق على وجه الأرض راح يعرف إيش كتبت🙂
                </Text>
              </Text>
            </View>
            <Button
              title='إغلاق'
              onPress={() => setShowModal(false)}
              color={Colors.secondaryColor}
            />
          </ScrollView>
        </CustomModal>
        <View style={styles.content}>
          <Text style={styles.title}>
            هل كلمة السر التي استخدمها أصبحت مكشوفه{' '}
            <Entypo
              onPress={() => setShowModal(true)}
              name='info-with-circle'
              size={24}
              color={Colors.secondaryColor}
            />
          </Text>
          <FindPass />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 40,
  },
  container: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 25,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingBottom: 20,
    textAlign: 'center',
    color: Colors.titleText,
    fontSize: 23,
    fontWeight: 'bold',

    marginBottom: 10,
  },
  modal: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  titleModal: {
    paddingBottom: 5,
    textAlign: 'right',
  },
  detailModal: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Home;
