import { View, TextInput, Text } from 'react-native';

export default function ReportFilters({ year, setYear }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>Filtrar por año:</Text>

      <TextInput
        placeholder="Ej: 2015"
        value={year}
        onChangeText={text => setYear(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginTop: 8
        }}
      />
    </View>
  );
}
