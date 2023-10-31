import React, {useState, useEffect} from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';


export default function Register({navigation}) {

  const [text, setText] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  function registerValidation() {
    if (text == "" || senha == "" || confSenha == "") {
      Alert.alert(
        "PREENCHA TODOS OS CAMPOS",
        "Para se registrar no sistema informe todos os campos acima."
      );
    } else if (confSenha != senha) {
      Alert.alert(
        "SENHAS DIFERENTES",
        "As senhas digitadas não correspondem, verifique e tente novamente."
      );
    } else {
      handleNewAccount();
    }
  }

  function handleNewAccount() {
    auth()
      .createUserWithEmailAndPassword(text, senha)
      .then(() => {
        auth().currentUser.sendEmailVerification();
        auth().currentUser.updateProfile({
        });
        Alert.alert(
          "CADASTRADO",
          "Usuário cadastrado no sistema com sucesso, enviamos um e-mail para que você verifique-o somente assim poderá entrar no sistema."
        );
        navigation.goBack();
      })
      .catch((error) => {
        registerValidationAuth(error.code);
      });
  }

  function registerValidationAuth(error) {
    if (error === "auth/invalid-email") {
      Alert.alert(
        "E-MAIL MAL INFORMADO",
        "E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc..."
      );
    }

    if (error === "auth/weak-password") {
      Alert.alert(
        "SENHA FRACA",
        "Crie uma senha com pelo menos 6 caracteres para se cadastrar."
      );
    }

    if (error === "auth/email-already-in-use") {
      Alert.alert(
        "E-MAIL JÁ CADASTRADO",
        "Este endereço de e-mail já está cadastrado em outra conta."
      );
    }

    if (error === "auth/network-request-failed") {
      Alert.alert(
        "CONECTE-SE",
        "Verifique se você está conectado a internet e tente novamente."
      );
    }
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          style={{width: 350, height: 210}}
          source={require('../../assets/mycine.png')}
        />     
      </View>

      <View 
        style={[
          styles.container        
        ]}
      >
        <TextInput 
        style ={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        />

        <TextInput 
        style ={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        onChangeText={newSenha => setSenha(newSenha)}
        defaultValue={senha}
        />

        <TextInput 
        style ={styles.input}
        placeholder='Confirmar Senha'
        autoCorrect={false}
        onChangeText={newConfSenha => setConfSenha(newConfSenha)}
        defaultValue={confSenha}
        />

        <TouchableOpacity 
          disabled = { text.length > 8 && senha.length > 8 && confSenha.length > 8 && senha == confSenha ? false : true }
          style={text.length > 8 && senha.length > 8 && confSenha.length > 8 && senha == confSenha ? styles.btnSubmit : styles.btnDisablade}
          onPress={registerValidation}>
          <Text style={styles.submitText}>Registrar-se</Text>
        </TouchableOpacity>

      </View>    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#191a30'
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
    paddingTop:50
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    paddingBottom:260
  },
  input:{
    backgroundColor:'#fff',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize: 17,
    borderRadius: 10,
    padding:12
  },
  btnSubmit:{
    backgroundColor:'#e72f49',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  btnDisablade:{
    backgroundColor:'#e72f49',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    opacity: 0.5
  },
  submitText:{
    color:'#fff',
    fontSize: 18
  },
  btnRegister:{
    marginTop: 10,
  },
  RegisterText:{
    color:'#fff',
    fontSize: 15
  }

});