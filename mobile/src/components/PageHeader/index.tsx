import React, { ReactNode } from 'react'; // importamos ReactNode, a utilidade dele é passar como propriedade de um componente outro componente
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'; // como é apenas um ícone (sem fundo), importamos BorderlessButton
import { useNavigation } from '@react-navigation/native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import styles from './styles';


interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode; // dizemos que ReactNode é opcional
}

const PageHeader: React.FunctionComponent <PageHeaderProps> = ({ title, headerRight, children }) => {

  // const 'navigation' desestruturada
  const { navigate } = useNavigation();

  const handleGoBack = () => {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image 
            source={backIcon} 
            resizeMode="contain" 
          />
        </BorderlessButton>
        <Image 
          source={logoImg} 
          resizeMode="contain" 
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
    </View>
  )
}

export default PageHeader;