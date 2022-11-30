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
  Animated,
  Alert
} from 'react-native';


export default function Login({navigation}) {

  const [text, setText] = useState('');
  const [senha, setSenha] = useState('');

  const login = () =>{
    Alert.alert(
      "Logado com sucesso",
      "Iremos te redirecionar para a tela inicial do aplicativo",
      [
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]
    );
    /*export async function saveLog(key, newLog) {
      let logsStored = await getLogsSave(key);
    
      //Se tiver um usuario salvo com mesmo id
      const hasLog = logsStored.some((item) => item.id === newLog.id);
      if (hasLog) {
        return;
      }
    
      logsStored.push(newLog);
    
      await AsyncStorage.setItem(key, JSON.stringify(logsStored));
    }
    */
  }

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(()=> {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      })
    ]);

  }, []);


    

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/mycine.png')}
        />  
      </View>

      <Animated.View 
        style={[
          styles.container,
          {
            Transform:[
              { translateY: offset.y }
            ]
          }
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

        <TouchableOpacity 
          disabled = { text.length > 8 && senha.length > 8 ? false : true }
          style={text.length > 8 && senha.length > 8 ? styles.btnSubmit : styles.btnDisablade} 
          onPress={() => login()}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister} onPress= { () => navigation.navigate('Cadastro')}>
          <Text style={styles.RegisterText}>Cadastre-se</Text>
        </TouchableOpacity>

      </Animated.View>    
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