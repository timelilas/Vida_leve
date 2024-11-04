import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  containerEmailPassword: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 48,
    minWidth: 240,
    backgroundColor: "#F7F7FC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4E4B66',
  },
  containerInput: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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