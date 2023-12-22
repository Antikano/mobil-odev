import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login/Login';
import Kategoriler from './app/screens/Ürün/Kategoriler/Kategoriler';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UrunNav from './app/screens/Ürün/Kategoriler/UrunNav';
import Profile from './app/screens/Profile/Profile';
import Sepet from './app/screens/Sepet/Sepet';
import ListeNav from './app/screens/Listeler/ListeNav';

import { AntDesign } from '@expo/vector-icons';
import CreateProduct from './app/screens/Admin/createProduct';

const Stack = createNativeStackNavigator();
const InsideStack = createBottomTabNavigator();

const screenOptions: any = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70
  }
};

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="UrunSayfasi" screenOptions={screenOptions}>
      <InsideStack.Screen name='UrunSayfasi' component={UrunNav} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={24}
            color={focused ? "#0782F9" : "#b3aaaa"}
          />
        ),
      }} />
      <InsideStack.Screen name='Listeler' component={ListeNav} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "list" : "list-outline"}
            size={24}
            color={focused ? "#0782F9" : "#b3aaaa"}
          />
        ),
      }} />


      <InsideStack.Screen name='Admin' component={CreateProduct} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name='user'
            size={24}
            color={focused ? "#0782F9" : "#b3aaaa"}
          />
        ),
      }} />


<InsideStack.Screen
  name='Sepet'
  component={Sepet}
  options={{
    headerShown: true,
    headerTitle: 'Sepet',
    headerTitleAlign: 'center', // Başlığı ortala
    headerTitleStyle: {
      fontSize: 20, // Başlık font boyutu
      fontWeight: 'bold', // Kalın font
    },
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={focused ? 'basket' : 'basket-outline'}
        size={24}
        color={focused ? '#0782F9' : '#b3aaaa'}
      />
    ),
  }}
/>


      <InsideStack.Screen name='Profil Ekrani' component={Profile} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            size={24}
            color={focused ? "#0782F9" : "#b3aaaa"}
          />
        ),
      }} />
    </InsideStack.Navigator>

  );
}

export default function App() {

  const [user, setUser] = useState<User | null>(null);
  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      })
    }, []
  )

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout}
            options={{
              headerShown: false

            }} />
        ) : (
          <Stack.Screen name="Login" component={Login}
            options={{
              headerShown: false
            }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}