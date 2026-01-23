import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Button, Modal, ScrollView, Platform, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Print from 'expo-print';
import { generarInformeHTML } from '../utils/generarInformeHTML';
import { BarChart } from 'react-native-chart-kit';
import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportRow from '../components/ReportRow';
import ReportSummary from '../components/ReportSummary';

export default function Index() {

    const data = [
        { label: 'Selecciona el año', value: null},
        { label: 'Todos', value: 'Todos' },
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
    ];

    const [value, setValue] = useState(null)
    const [datos, setDatos] = useState([]);
    const [nombre, setNombre] = useState('')
    const [isChecked, setChecked] = useState(false)
    const [nominacion, setNominacion] = useState(1);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/games.json')
            .then(res => res.json())
            .then(data => setDatos(data));
    }, []);

    const conteoNominees = datos.reduce((acc, item) => {
        acc[item.nominee] = (acc[item.nominee] || 0) + 1;
        return acc;
    }, {});
    const datosConConteo = datos.map(d => ({
        ...d,
        totalNominaciones: conteoNominees[d.nominee]

    }));
    


    const datosFiltrados = datosConConteo.filter(d => {

        const cumpleYear = value === "Todos" || value === null
            || d.year == value;
        const cumpleGanador = !isChecked || isChecked == (d.winner == 1);
        const cumpleNombre = nombre === '' || d.nominee.toLowerCase().includes(nombre.toLowerCase());
        const cumpleNominacion = nominacion === 1 || d.totalNominaciones >= nominacion;

        return (cumpleYear && cumpleGanador && cumpleNombre && cumpleNominacion)
    });

    const exportarPDF = async () => {
        const html = generarInformeHTML(datosFiltrados);
        await Print.printAsync({ html });
    };

    const totalNominaciones = datosFiltrados.reduce((acc, item) => {
        acc[item.nominee] = (acc[item.nominee] || 0) + 1;
        return acc;
    }, {});
const top5Nominados = Object.entries(totalNominaciones)
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 5);               
    
    const nomimaciones = top5Nominados.map(item => item[0]);
    const totales = top5Nominados.map(item => item[1]);
    
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
                                data={data}
                                value={value}
                                setValue={setValue}
                                isChecked={isChecked}
                                setChecked={setChecked}
                                nombre={nombre}
                                setNombre={setNombre}
                                nominacion={nominacion}
                                setNominacion={setNominacion}
                            />
                            <View style={[styles.row, styles.header]}>
                                <Text style={styles.headerCell}>Año</Text>
                                <Text style={styles.headerCell}>Categoría</Text>
                                <Text style={styles.headerCell}>Nominado</Text>
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
                <Button title="Exportar a PDF" onPress={exportarPDF} />
                    <Button
            title="Generar gráfico Top 5 por nominaciones/ganadores"
            onPress={() => setMostrarGrafico(true)}
            />
            
        <Modal
        visible={mostrarGrafico}
        animationType="slide"
        onRequestClose={() => setMostrarGrafico(false)}
        >
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: 16 }}>

                        <Text>Gráfico de nominaciones</Text>

                         <BarChart
                            verticalLabelRotation={45}
                            data={{
                            labels: nomimaciones,
                            datasets: [{ data: totales }]
                            }}
                            width={screenWidth - 32}
                            height={400}
                            yAxisLabel=""
                            fromZero
                            chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: () => '#000',
                            propsForLabels: {
                                fontSize: 10
                            }
                            }}
                        />

                        
                    </ScrollView>
                    <Button
                        title="Cerrar"
                        onPress={() => setMostrarGrafico(false)}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>

            </SafeAreaView>
        </SafeAreaProvider>
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
    header: {
        backgroundColor: '#eee',
        borderBottomWidth: 2
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
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
});
