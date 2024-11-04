import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/home.jsx';
import Login from './components/login.jsx'
import SignUpScreen from './components/cadastro.jsx';
import SucessoLogin from './components/SucessoLogin.jsx';
import EsqueciSenha from './components/EsqueciSenha.jsx';
import Formulario from './components/Formulario.jsx';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SucessoLogin" component={SucessoLogin} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="Formulario" component={Formulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
