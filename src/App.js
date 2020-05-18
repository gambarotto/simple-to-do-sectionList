/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SectionList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import ItemList from './components/ItemList';

const App = () => {
  const [data, setData] = useState([
    { data: [] },
    { data: [] },
  ]);
  const [dataDo, setDataDo] = useState([]);
  const [dataId, setDataId] = useState(1);
  const [input, setInput] = useState('');

  function addToDo() {
    const value = { id: String(dataId), value: input, do: false };

    setData([
      { title: 'À fazer', data: [value, ...data[0].data] },
      { title: dataDo.length > 0 ? 'Feito' : '', data: [...dataDo] },
    ]);
    setDataId(dataId + 1);
  }

  function handleCheckbox(value, checkbox) {
    if (checkbox) {
      const val = { ...value, id: `${value.id}do`, do: checkbox };
      const arr = data[0].data.filter((item) => item.id !== value.id);
      setData([
        { title: arr.length > 0 ? 'À fazer' : '', data: [...arr] },
        { title: 'Feito', data: [val, ...dataDo] },
      ]);
      setDataDo([val, ...dataDo]);
    } else {
      const val = { ...value, id: `${value.id}do`, do: checkbox };
      const arr = data[1].data.filter((item) => item.id !== value.id);
      setData([
        { title: 'À fazer', data: [val, ...data[0].data] },
        { title: 'Feito', data: [...arr] },
      ]);
      setDataDo([...arr]);
    }
  }

  const renderItem = ({ item }) => (<ItemList item={item} setData={handleCheckbox} />);
  const renderSection = ({ section: { title } }) => (
    <Text style={styles.section}>
      {title}
    </Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#667eea" barStyle="dark-content" />
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Add to do</Text>
          </View>
          <View style={styles.input}>
            <View style={styles.iconInput}>
              <AntDesign name="edit" size={20} color="#333" />
            </View>
            <View style={styles.action}>
              <TextInput placeholder="Digite uma nova tarefa..." onChangeText={(text) => setInput(text)} />
            </View>
            <LinearGradient colors={['#84fab0', '#8fd3f4']} style={styles.buttonAdd}>
              <TouchableOpacity style={styles.toAdd} onPress={() => addToDo()}>
                <Entypo name="add-to-list" size={20} color="#222" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.body}>
          <SectionList
            sections={data}
            renderItem={renderItem}
            renderSectionHeader={renderSection}
            keyExtractor={(item, index) => item + index}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default App;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: 110,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  containerTitle: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: width * 0.65,
    height: 50,
    flexDirection: 'row',
  },
  iconInput: {
    width: width * 0.1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
  },
  action: {
    width: '100%',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    fontSize: 16,
  },
  buttonAdd: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  toAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  body: {

    marginTop: 20,
    paddingHorizontal: 5,
  },
  section: {
    justifyContent: 'center',
    color: '#f5f5f5',
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
