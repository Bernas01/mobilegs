
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import { db } from '../services/firebaseConfig'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function SoilForm() {
  const [location, setLocation] = useState('');
  const [caracteristica, setCaracteristica] = useState(''); 
  const [condition, setCondition] = useState('');
  const [formulariosList, setFormulariosList] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrEditFormulario = async () => {
    try {
      if (editId) {
        
        await updateDoc(doc(db, 'Formularios', editId), { location, caracteristica, condition });
        Alert.alert("Formulário Atualizado");
      } else {
        // Adiciona um novo formulário
        await addDoc(collection(db, 'Formularios'), { location, caracteristica, condition });
        Alert.alert("Formulário Cadastrado");
      }
      setLocation('');
      setCaracteristica(''); 
      setCondition('');
      setEditId(null);
      getFormularios();
    } catch (e) {
      console.error("Erro ao adicionar ou atualizar documento: ", e);
    }
  };

  const getFormularios = async () => {
    const d = [];
    const querySnapshot = await getDocs(collection(db, 'Formularios'));
    querySnapshot.forEach((doc) => {
      const formulario = {
        id: doc.id,
        location: doc.data().location,
        caracteristica: doc.data().caracteristica, // Ajuste aqui
        condition: doc.data().condition,
      };
      d.push(formulario);
    });
    setFormulariosList(d);
  };

  const deleteFormulario = async (id) => {
    try {
      await deleteDoc(doc(db, 'Formularios', id));
      Alert.alert("Formulário Excluído");
      getFormularios();
    } catch (e) {
      console.error("Erro ao excluir documento: ", e);
    }
  };

  const editFormulario = (formulario) => {
    setLocation(formulario.location);
    setCaracteristica(formulario.caracteristica); 
    setCondition(formulario.condition);
    setEditId(formulario.id);
  };

  useEffect(() => {
    getFormularios();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Caracteristica" 
        value={caracteristica}
        onChangeText={setCaracteristica} 
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Condição do Solo"
        value={condition}
        onChangeText={setCondition}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title={editId ? "Atualizar Formulário" : "Cadastrar Formulário"} onPress={addOrEditFormulario} />
      <FlatList
        data={formulariosList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
            <Text>{item.location} - {item.caracteristica} - {item.condition}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="Editar" onPress={() => editFormulario(item)} />
              <Button title="Excluir" onPress={() => deleteFormulario(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
