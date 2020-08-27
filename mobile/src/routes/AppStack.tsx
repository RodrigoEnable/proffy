import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; // importamos NavigationContainer, componente que deve ficar por volta de todas as rotas
import {createStackNavigator} from '@react-navigation/stack'; // importamos createStackNavigator
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTab from './StudyTab';

// const 'appStackNavigation' desestruturada
const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="StudyTab" component={StudyTab} /* importamos a navegação por abas para dentro da nossa navegação por pilha */ />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack;