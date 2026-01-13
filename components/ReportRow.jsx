import { View, Text, StyleSheet } from 'react-native';

export default function ReportRow({ item, index }) {
    //numberOfLines={1} para evitar saltos 
  return (
    <View style={styles.row}>
      <Text style={styles.colIndex}>{index + 1}</Text>
      
      <Text style={styles.colYear} numberOfLines={1}> 
        {item.year}
      </Text>
      <Text style={styles.colCategory} numberOfLines={1}>
        {item.category}
      </Text>
      <Text style={styles.colNominee} numberOfLines={1}>{item.nominee}</Text>
      <Text style={styles.colCompany} numberOfLines={1}>{item.company} </Text>
      <Text style={styles.colWinner} numberOfLines={1}>{item.winner === 1 ? 'Sí' : 'No'} </Text>
      <Text style={styles.colVoted} numberOfLines={1}>{item.voted} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 4,    
  },
  colIndex: {
    flex: 1/2,
  },
  colYear: {
    flex: 2,
  },
  colCategory: {
    flex: 2,
  },
  colNominee: {
    flex: 2,
  },
  colCompany: {
    flex: 2,
  },
  colWinner: {
    flex: 1,
  },
  colVoted: {
    flex: 2,
  },
});
