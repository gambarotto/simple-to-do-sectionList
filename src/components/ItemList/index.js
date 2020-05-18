import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CheckBox } from 'react-native-elements';

// eslint-disable-next-line react/prop-types
const ItemList = ({ item, setData }) => {
  const [checkbox, setCheckbox] = useState(item.do);

  function checkHandle() {
    setData(item, !checkbox);
  }
  return (
    <Animatable.View style={item.do ? styles.containerDo : styles.container} animation="bounceIn">
      <Text style={item.do ? styles.titleDo : styles.title}>{item.value}</Text>
      <View style={item.do ? styles.checkboxViewDo : styles.checkboxView}>
        <CheckBox
          checkedColor="#764ba2"
          checked={!!item.do}
          onPress={() => checkHandle()}
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  containerDo: {
    height: 70,
    width: '100%',
    backgroundColor: '#333',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  titleDo: {
    fontSize: 18,
    color: '#f5f5f5',
  },
});
export default ItemList;
