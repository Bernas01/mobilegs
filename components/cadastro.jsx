import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importar do Firebase
import { auth } from '../services/firebaseConfig'; // Presumindo que sua configuração do Firebase esteja neste arquivo

const SignUpScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const cadastrar = () => {
    if (!nome || !email || !senha) {
      setErro('Por favor, preencha todos os campos.');
    } else {
      // Lógica de cadastro usando Firebase Authentication
      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setErro(''); // Limpar mensagens de erro
          navigation.navigate('Login'); // Navegar para a tela de login após cadastro bem-sucedido
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErro(errorMessage); // Exibir mensagem de erro
        });
    }
  };

  return (
    <ImageBackground source={require('../assets/agro32.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>CADASTRO</Text>
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={text => setSenha(text)}
        />
        
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  erro: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#006400',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
