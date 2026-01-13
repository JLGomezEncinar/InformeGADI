import { View, Text, StyleSheet } from 'react-native';

export default function ReportHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Informe de los Game Awards 2014-2019</Text>
      <Text>Segundo DAM – Desarrollo de Interfaces</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
