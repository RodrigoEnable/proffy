import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // importamos createBottomTabNavigator
import { Ionicons } from '@expo/vector-icons';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

// const 'appTabNavigation' desestruturada
const { Navigator, Screen } = createBottomTabNavigator();

const StudyTab = () => {
  return (
      /* NavigationContainer não é chamado aqui porque a navegação por abas está dentro da navegação por pilha, ou seja, dentro de NavigationContainer */
      <Navigator tabBarOptions={{
        /* todas as propriedades são personalizações fornecidas pelo React Navigation, style, tabStyle, etc */
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        /* cor de fundo da aba quando não está selecionada */
        inactiveBackgroundColor: '#FAFAFC',
        /* cor de fundo da aba quando está selecionada */
        activeBackgroundColor: '#EBEBF5',
        /* cor do texto na aba quando não está selecionada */
        inactiveTintColor: '#C1BCCC',
        /* cor do texto na aba quando está selecionada */
        activeTintColor: '#32264D',
      }}>
        <Screen 
          name="TeacherList" 
          component={TeacherList} 
          options={{
            // título da aba
            tabBarLabel: 'Proffys', 
            // estilização do ícone utilizado na aba (os parâmetros que recebemos aqui vem de inactiveBackgroundColor, activeBackgroundColor, inactiveTintColor, activeTintColor)
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-easel" color={focused ? '#8257E5' : color} size={size} /> 
          }}
        />
        <Screen 
          name="Favorites" 
          component={Favorites} 
          options={{
            // título da aba
            tabBarLabel: 'Favoritos',
            // estilização do ícone utilizado na aba (os parâmetros que recebemos aqui vem de inactiveBackgroundColor, activeBackgroundColor, inactiveTintColor, activeTintColor)
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-heart" color={focused ? '#8257E5' : color} size={size} /> 
          }}
        />
      </Navigator>
  )
}

export default StudyTab;