import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    gap: 24,
    width: "100%",
    marginBottom: 72,
  },
  inputField: {
    gap: 8,
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
  },
  input: {
    padding: 16,
    backgroundColor: "#F7F7FC",
    borderRadius: 8,
    borderColor: "#4E4B66",
    borderWidth: 1,
  },
  inputPassword: {
    paddingRight: 56,
  },
  button: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: 'red',
    marginBottom: 24,
  },
});

export default styles;