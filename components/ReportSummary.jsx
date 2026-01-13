import { View, Text } from 'react-native';

export default function ReportSummary({ datos }) {

  const totalGanadores = datos.reduce(
    (total, d) => {if (d.winner === 1) return total + 1; else return total},
    0
  );

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Resumen</Text>
      <Text>Número de nominados: {datos.length}</Text>
      <Text>Ganadores: {totalGanadores} </Text>
    </View>
  );
}
