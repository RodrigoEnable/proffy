import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';

const GiveClasses = () => {
  const { goBack } = useNavigation(); // o método goBack permite retornar para a tela anterior na pilha

  const handleNavigateBack = () => {
    goBack(); 
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain" /* utilizamos a propriedade resizeMode visto que funciona melhor assim do que no estilo normal para o componente ImageBackground */
        source={giveClassesBgImage} 
        style={styles.content} /* pedimos para que a imagem de background fique contida ao tamanho do elemento pela propriedade resizeMode="contain" */>
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;