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


export default function Register({navigation}) {

  const register = () =>{
    Alert.alert(
      "Conta criada com sucesso",
      "Iremos te redirecionar para a tela inicial do aplicativo",
      [
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]
    );
  }

  const [text, setText] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
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
          onPress={() => register()} >
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
    backgroundColor: '#191919'
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
    backgroundColor:'#35AAFF',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  btnDisablade:{
    backgroundColor:'#35AAFF',
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