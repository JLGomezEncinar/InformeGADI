import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Checkbox } from 'expo-checkbox';

export default function ReportFilters({ value, setValue, data, isChecked, setChecked, nombre, setNombre }) {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecciona el año"
        value={value}
        onChange={item => {
          setValue(item.value);
          console.log('Seleccionado:', item.label);
        }}
      />
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>¿Ganó algún premio</Text>
      </View>
      <View style={{ marginBottom: 16 }}>

        <Text>Filtrar por nombre:</Text>
        <TextInput
          placeholder="Ej: Destiny"
          placeholderTextColor= 'grey'
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8
  }

});
