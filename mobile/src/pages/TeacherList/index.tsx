import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import styles from './styles';

const TeacherList = () => {

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]); // podemos sinalizar que o favorites é um array numérico diretamente também, sem defini-lo em interface
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useEffect(() => {
    loadFavorites();
  }, [teachers]);

  const handleFiltersSubmit = async () => {
    //console.log(subject, week_day: weekday, time)
    // não podemos enviar diretamente os parâmetros numa requisição get, somente post e put
    // numa requisição get solicitamos dentro da propriedade params
    // aqui utilizamos o async/await e no TeacherForm utilizamos o then/catch
    const response = await api.get('classes', {
      params: {
        subject, // short sintax
        week_day: weekday, // como o nome do estado não é o mesmo do parâmetro, não é possível aplicar short sintax, e atribuímos a ele o estado
        time // short sintax
      }
    });
    console.log(response.data);
    setFiltersVisible(false);
    setTeachers(response.data);
  }

  const handleTogglerFiltersVisible = () => {
    setFiltersVisible(!filtersVisible);
    // se for false, ao clicar seta como true, se estiver true, ao clicar seta como false
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={( // sempre utilizar parênteses quando for necessário retornar mais de uma linha de JSX, aqui retornamos o componente por meio do ReactNode
          <BorderlessButton onPress={handleTogglerFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        {filtersVisible && (<View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input} 
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?" 
              placeholderTextColor={"#C1BCCC"}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input} 
                  value={weekday}
                  onChangeText={text => setWeekday(text)}
                  placeholder="Qual o dia?" 
                  placeholderTextColor={"#C1BCCC"}
                />
              </View> 
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input} 
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o dia?" 
                  placeholderTextColor={"#C1BCCC"}
                />
              </View> 
            </View>
            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>  
        )}  
      </PageHeader>
      <ScrollView 
        style={styles.teacherList}
        // utilizamos a propriedade contentContainerStyle visto que o padding funciona melhor aqui do que no estilo normal
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)} 
          />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;