import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // importamos useNavigation para habilitar a navegação nos botões
import { RectButton } from 'react-native-gesture-handler'; // importamos RectButton para que os botões ganhem os efeitos nativos do ios e android ao serem pressionados (útil apenas quando o botão tem "fundo", quando não é apenas um ícone a ser pressionado, por exemplo)
import api from '../../services/api'; // faz a conexão com o axios
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

const Landing = () => {
  // const 'navigation' desestruturada
  const { navigate } = useNavigation();
  // estado que gerencia o total de conexões
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
    const {total} = response.data; // sem desestruturação seria const total = response.data.total
    setTotalConnections(total);
    })
  }, []); // o array, resumidamente é, quando eu quero disparar a arrow function dentro de useEffect?
          // dentro do array nós passamos as informações que, quando alteradas, dispara novamente a arrow function
          // se queremos que UseEffect execute uma única vez quando o componente é montado, devemos deixar o array vazio

  const handleNavigateToGiveClassesPage = () => {
    navigate('GiveClasses');
  }

  const handleNavigateToStudyPage = () => {
    navigate('StudyTab');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title} /* o text é o único componente que herda estilo no JS, se houver um <Text> dentro de outro <Text>, o componente filho herda estilo do componente pai */>
        Seja bem-vindo, {'\n' /* quebra de linha no JS */} 
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton 
          onPress={handleNavigateToStudyPage} 
          style={[styles.button, styles.buttonPrimary]} /* é possível passar dois estilos para um componente colocando-os dentro de um array */>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton 
          onPress={handleNavigateToGiveClassesPage} 
          style={[styles.button, styles.buttonSecondary]} /* é possível passar dois estilos para um componente colocando-os dentro de um array */>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' ' /* uma forma de colocar um espaço para separar o texto do ícone */}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
};

export default Landing;