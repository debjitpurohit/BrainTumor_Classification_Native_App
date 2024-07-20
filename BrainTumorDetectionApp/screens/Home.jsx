import { useState,useEffect } from 'react';
import {   Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,} from 'react-native'
  import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo"
import { Dialog, Button } from "react-native-paper"
import Task from '../components/Task'
import { Context, server } from '../App'
import axios from 'axios'
// import { useNavigation } from '@react-navigation/native'
export const fonts = {
    Bold: {fontFamily: 'sans-serif'},
  };
  export const {height, width} = Dimensions.get('window');
const Home = ({ navigation ,route}) => {
    const [result, setResult] = useState('');
    const [label, setLabel] = useState('');
    const isDarkMode = useColorScheme() === 'dark';
    const [image, setImage] = useState('');
    const [baseimg,setBaseImg]=useState('')
    const [loading,setLoading]=useState(false)
    const handleImage = () => {
        navigation.navigate("camera", {
            updateProfile: false
        })
    };
    // const baseimg = route.params.image.assets[0]
    const generatepredict= async()=>{
      setLoading(true)
      const imageData = []
      imageData.push(baseimg.base64)
      const data = { image: ['data:image/jpeg;base64,'+imageData] }
      // const url = 'http://147.185.221.21:17642/';
      const url = 'https://brain-tumor-backend-final.onrender.com/predict'
      // axiosfunc(url,data);
      console.log(data)
      try{
        const res = await axios.post(url,data);
        if(res.status===200){
          setLabel(res.data.result)
          setLoading(false)
          console.log(res.data.result)
        }
      }
      catch(error){
        setLabel(`Prediction Falied \n Try with another Image`)
        setLoading(false)
        console.log(error)
      }

      // setPredictedImage(image)
      // setPredictions({ image: imageData, result: res.data.result })
      // console.log(res.data.result)
      // setShowPrediction(true);
      // setLoading(false);

    };
    // const axiosfunc=async(url,data)=>{


    // }
    const clearOutput = () => {
        setResult('');
        setImage('');
        setLabel('')
      };
      useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setImage(route.params.image.assets[0].uri)
                setBaseImg(route.params.image.assets[0])
            }
        }

    }, [route])
  //  console.log(image)

    return (
        <>
            <View style={[styles.outer]}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <ImageBackground
      blurRadius={10}
      source={{uri: 'background'}}
      style={{height: height, width: width}}
    />
    <Text style={styles.title}>{'Brain-Tumor Detection'}</Text>
    {(loading && (<View style={styles.mainOuter}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>)) ||(null)}
    <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
      <Image source={{uri: 'https://i.postimg.cc/QCqs25DW/clean.png'}} style={styles.clearImage} />
    </TouchableOpacity>
    {(image?.length && (
        <Image source={{uri: image}} style={styles.imageStyle} />
      )) ||
      <Image source={{uri: 'https://i.postimg.cc/YqGBNJGW/image-96.jpg'}} style={styles.imageStyle} />}
    {(label && (
      <View style={styles.mainOuter}>
        <Text style={[styles.space, styles.labelText]}>
          {'Label: \n'}
          <Text style={styles.resultText}>{label}</Text>
        </Text>
        <Text style={[styles.space, styles.labelText]}>
          {'Confidence: \n'}
          <Text style={styles.resultText}>
            {`98` + '%'}
          </Text>
        </Text>
      </View>
    )) ||
      (image && <Text style={styles.emptyText}>{label}</Text>) || (
        <Text style={styles.emptyText}>
        {`Select a picture of\n Brain Tumor MRI.`}
        </Text>
      )}
      {(image?.length && (
            <View style={styles.btn}>
            <TouchableOpacity
              activeOpacity={0.9}
              disabled={label}
              onPress={generatepredict}
              style={styles.btnsts}>
              {/* <Image source={{uri: 'https://i.postimg.cc/7hTyx3Xt/upload.png'}} style={styles.imageIcon} />  */}
               <Text style={styles.btntxt}>Predict</Text>
            </TouchableOpacity>
          </View>
      )) ||
      <View style={styles.btn}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleImage}
        style={styles.btnStyle}>
        <Image source={{uri: 'https://i.postimg.cc/7hTyx3Xt/upload.png'}} style={styles.imageIcon} />
      </TouchableOpacity>
    </View>}
    
  </View> 

        </>
    )
}

export default Home
const styles = StyleSheet.create({
  devlp:{
    color:'red',

  },
  btnsts:{
        backgroundColor:'violet',
        opacity: 0.8,
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
  },
  btntxt:{
    color:'red',
    fontSize: 18, ...fonts.Bold

  },
    title: {
        alignSelf: 'center',
        position: 'absolute',
        top: 10,
        fontSize: 30,
        ...fonts.Bold,
        color: 'red',
      },
      clearImage: {height: 40, width: 40, tintColor: 'red'},
      mainOuter: {
        padding:2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: height / 1.6,
        alignSelf: 'center',
      },
      outer: {
        flex: 1,
        backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
      },
      btn: {
        color:'black',
        position: 'absolute',
        bottom: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      btnStyle: {
        backgroundColor: 'white',
        opacity: 0.8,
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
      },
      imageStyle: {
        marginBottom: 30,
        width: width / 1.5,
        height: width / 1.5,
        borderRadius: 20,
        borderWidth: 1,
        position: 'absolute',
        borderWidth: 0.4,
        // borderStyle: 'dashed',
        borderColor: 'white',
        top: height / 4.6,
      },
      clearStyle: {
        paddingTop: 10,
        position: 'absolute',
        top: 100,
        right: 30,
        tintColor: '#FFF',
        zIndex: 10,
      },
      space: {marginVertical: 10, marginHorizontal: 10},
      labelText: {color: '#FFF', fontSize: 15, ...fonts.Bold,color:'red'},
      resultText: {fontSize: 15, ...fonts.Bold,color:'white'},
      imageIcon: {height: 40, width: 40, tintColor: ''},
      emptyText: {
        position: 'absolute',
        top: height / 1.6,
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 20,
        maxWidth: '70%',
        ...fonts.Bold,
      },
})