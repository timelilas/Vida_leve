import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EFF0F6',
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  buttonText: {
    backgroundColor : '#FFAE31',
    width: 398, 
    height: 48, 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.7)',
    display: "flex",
    justifyContent: "center",
  },
  buttonText2: {
    backgroundColor : '#F7F7FC',
    width: 398, 
    height: 48, 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.7)',
    display: "flex",
    justifyContent: "center",
  },
});

export default styles;
