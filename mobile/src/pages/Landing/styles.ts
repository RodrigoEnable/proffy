import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    padding: 40,
  },
  banner: {
    width: '100%', // queremos que ocupe todo espaço disponível
    resizeMode: 'contain', // queremos que a imagem não ultrapasse a tela do dispositivo
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#9871F5',
  },
  buttonSecondary: {
    backgroundColor: '#04D361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    fontSize: 12,
    lineHeight: 20, // aplicamos um espaçamento entre as linhas do texto
    maxWidth: 140, // aplicamos um tamanho máximo para a largura do texto
    marginTop: 40,
  }
});

export default styles;