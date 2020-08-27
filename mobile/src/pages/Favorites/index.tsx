import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // useFocusEffect permite que uma aba da navegação por abas seja atualizada automaticamente caso ocorra alguma modificação
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import styles from './styles';

const Favorites = () => {

  const [favorites, setFavorites] = useState([]); // podemos sinalizar que o favorites é um array numérico diretamente também, sem defini-lo em interface

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }

  // aplicamos o useFocusEffect do React Navigation
  useFocusEffect(
    useCallback(() => { // utilizamos o hook useCallback para evitar um loop
      loadFavorites();
    }, [])
  )

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView 
        style={styles.teacherList}
        // utilizamos a propriedade contentContainerStyle visto que o padding funciona melhor aqui do que no estilo normal
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited // o React entende que isso é true
            />
          )
        } )}
      </ScrollView>
    </View>
  );
}

export default Favorites;