import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportRow from '../components/ReportRow';
import ReportSummary from '../components/ReportSummary';

export default function Index() {

    const data = [
        { label: 'Todos', value: 'Todos' },
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
    ];
    


    const [value, setValue] = useState("Todos")
    const [datos, setDatos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [nominacion, setNominacion] = useState(1);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/JLGomezEncinar/FicheroJSON/refs/heads/main/games.json')
            .then(res => res.json())
            .then(data => setDatos(data));
    }, []);
    
   
  
    const datosFiltrados = datos.filter(d => {
        const cumpleYear = value === "Todos"
            || d.year == value;
        const cumpleGanador = !isChecked || isChecked == (d.winner == 1);
        const cumpleNombre = nombre === '' || d.nominee.toLowerCase().includes(nombre.toLowerCase());
        
        return (cumpleYear && cumpleGanador && cumpleNombre)
    });
    


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
