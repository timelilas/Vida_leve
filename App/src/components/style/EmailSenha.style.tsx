import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  textInput: {
    height: 48,
    minWidth: 240,
    backgroundColor: "#F7F7FC",
    borderRadius: 8,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: '#F7F7FC',
    marginBottom: 24,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    marginTop: 24,
  },
  errorText: {
    color: 'red',
    marginBottom: 24,
  },
});

export default styles;