import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportRow from '../components/ReportRow';
import ReportSummary from '../components/ReportSummary';

export default function Index() {

    const [datos, setDatos] = useState([]);
    const [year, setYear] = useState('Todas');

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/games.json')
            .then(res => res.json())
            .then(data => setDatos(data));
    }, []);

    const datosFiltrados = year === 'Todas'
        ? datos
        : datos.filter(d => d.year == year);


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>

                <FlatList
                    data={datosFiltrados}
                    keyExtractor={item => item.id.toString()}

                    renderItem={({ item, index }) => (
                        <ReportRow item={item} index={index} />
                    )}

                    ListHeaderComponent={
                        <>
                            <ReportHeader />
                            <ReportFilters
                                year={year}
                                setYear={setYear}
                            />
                            <View style={[styles.row, styles.header]}>
                                <Text style={styles.headerCell}>Año</Text>
                                <Text style={styles.headerCell}>Categoría</Text>
                                <Text style={styles.headerCell}>Nombre</Text>
                                <Text style={styles.headerCell}>Compañía</Text>
                                <Text style={styles.headerCell}>Ganador</Text>
                                <Text style={styles.headerCell}>Votación</Text>
                            </View>
                        </>


                    }

                    ListFooterComponent={
                        <ReportSummary datos={datosFiltrados} />
                    }

                    contentContainerStyle={{ padding: 16 }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );

}
const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8
    },
    header: {
        backgroundColor: '#eee',
        borderBottomWidth: 2
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
