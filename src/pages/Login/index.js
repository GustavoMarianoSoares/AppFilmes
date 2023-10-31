import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";

import Checkbox from "expo-checkbox";

import auth from "@react-native-firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  function changePasswordSecure() {
    if (isChecked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  function signInValidationAuth(error) {
    console.log(error);
    if (error === "auth/wrong-password") {
      Alert.alert(
        "SENHA",
        "Senha errada, tente novamente."
      );
    }

    if (error === "auth/invalid-login") {
      Alert.alert(
        "Login Invalido",
        "Email ou Senha errados, tente novamente."
      );
    }

    if (error === "auth/user-not-found") {
      Alert.alert(
        "E-MAIL",
        "E-mail não encontrado, verifique se o e-mail está correto e tente novamente."
      );
    }

    if (error === "auth/too-many-requests") {
      Alert.alert(
        "MUITAS TENTATIVAS",
        "Foram registradas muitas tentativas ao entrar nesta conta, tente novamente mais tarde."
      );
    }

    if (error === "auth/invalid-email") {
      Alert.alert(
        "E-MAIL MAL INFORMADO",
        "E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc..."
      );
    }

    if (error === "auth/network-request-failed") {
      Alert.alert(
        "CONECTE-SE",
        "Verifique se você está conectado a internet e tente novamente."
      );
    }
  }

  function signInValidation() {
    if (email == "" || password == "") {
      Alert.alert(
        "PREENCHA TODOS OS CAMPOS",
        "Para entrar no sistema informe todos os campos acima."
      );
    } else {
      handleSignIn();
    }
  }

  function checkEmailVerified() {
    if (auth().currentUser.emailVerified == false) {
      auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          Alert.alert(
            "VERIFIQUE SEU E-MAIL",
            "Enviamos novamente um e-mail de verificação para que possa entrar no sistema."
          );
        })
        .catch(() => {
          Alert.alert(
            "AGUARDE",
            "Aguarde em até 1 minuto para que possamos reenviar o e-mail de verificação."
          );
        });
    } else {
      Alert.alert("ENTROU", "Entrou no sistema com sucesso. 🌟");
      navigation.navigate("Home");
    }
  }

  function handleSignIn() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        checkEmailVerified();
      })
      .catch((error) => {
        signInValidationAuth(error.code);
      });
  }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          style={{ width: 350, height: 210 }}
          source={require("../../assets/mycine.png")}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            Transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(newEmail) => setEmail(newEmail)}
          defaultValue={email}
        />

        <TextInput
          secureTextEntry={!isChecked}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={(newPassword) => setPassword(newPassword)}
          defaultValue={password}
        />

        <TouchableOpacity
          onPress={changePasswordSecure}
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            marginBottom: 30,
            marginLeft: 20,
          }}
        >
          <Checkbox
            value={isChecked}
            color={isChecked ? "#339FFF" : "#797979"}
          />

          <Text style={{ color: "#fff", marginLeft: 5 }}>Mostrar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={email.length > 8 && password.length > 8 ? false : true}
          style={
            email.length > 8 && password.length > 8
              ? styles.btnSubmit
              : styles.btnDisablade
          }
          onPress={signInValidation}
        >
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.RegisterText}>Cadastre-se</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191a30",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    marginBottom: 70,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 260,
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 12,
  },
  btnSubmit: {
    backgroundColor: "#e72f49",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnDisablade: {
    backgroundColor: "#e72f49",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    opacity: 0.5,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 30,
  },
});
