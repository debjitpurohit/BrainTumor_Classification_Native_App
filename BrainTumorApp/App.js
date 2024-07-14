import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View ,Text, ScrollView,Button, Image} from 'react-native';
// import { Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [images, setImages] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [predictions, setPredictions] = useState();
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [image, setImage] = useState(null);

  const generatePrediction = () => {
  //  console.log(image)
    axios.post('http://127.0.0.1:5000/', image);
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView style={styles.scrollvw}>
    <View style={styles.container}>
      <Text style={styles.textclr} >Brain Tumor Detector 🧠</Text>
      <View style={styles.viewbox}>
      <Button title="Upload Image" onPress={pickImage} />
        <Text style={{color:'white',paddingBottom:20,paddingTop:20,fontWeight:'bold'}}> Try this Image for prediction</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <Button style={{}} title="Predict" onPress={generatePrediction} />
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollvw:{
    backgroundColor: '#15171E',
  },
  container: {
    paddingTop:50,
    flex: 1,
    alignItems: 'center',
    
    // justifyContent: 'center',
  },
  textclr:{
    color: 'red',
    fontSize:25
  },
  image: {
    paddingTop:20,
    width: 200,
    height: 200,
  },
  viewbox:{
    paddingTop:20,
    // display:'flex',

  }
});
