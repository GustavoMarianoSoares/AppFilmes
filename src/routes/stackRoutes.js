import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          title: "Detalhes",
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Sua Busca",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            color: "#FFF",
          },
          headerStyle: {
            backgroundColor: "#141a29",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
