import React, { useState, useCallback } from 'react';
import { View, Image, Text, Linking } from 'react-native'; // Linking é utilizado para que seja possível acessar outras aplicações a partir de um link
import { RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FunctionComponent <TeacherItemProps> = ({ teacher, favorited }) => {

  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = () => {
    /* Ao clicar no link de whatsapp, atualizamos o total de conexões */
    api.post('/connections', {user_id: teacher.id});
    /* Whatsapp Deep Linking, acessamos o aplicativo whatsapp pelo componente Linking do React Native */
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }
    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherFav: Teacher) => {
        return teacherFav.id === teacher.id;
      });
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  // aplicamos o useFocusEffect do React Navigation
  useFocusEffect(
    useCallback(() => { // utilizamos o hook useCallback para evitar um loop, aqui atualizamos a aba para alterar o botão de favorited
      setIsFavorited(favorited);
    }, [favorited])
  )

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{uri: teacher.avatar}} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora 
          {'   '}
          <Text style={styles.priceValue}>R$: {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
            styles.favoriteButton, 
            isFavorited ? styles.favorited : {},
            ]}>
            {isFavorited 
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>
          <RectButton 
            onPress={handleLinkToWhatsapp} 
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;