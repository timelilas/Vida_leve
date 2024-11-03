import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
  },
  inputs: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor : '#FFAE31',
    width: 398, 
    height: 48, 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.7)',
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "left",
  },
});

export default styles;
