import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Home(){
    return(
        <View style={styles.container}>
    <ScrollView>
    <View style={styles.header}>
      <View style={styles.logobox}>
          <Image style={styles.logo} source={require('../assets/rebazaar.jpg')}></Image>
      </View>
      <TextInput style={styles.search} placeholder='Search' placeholderTextColor={'#FFFFFF'}></TextInput>
      <Icon style={styles.icon2} name="cart-plus" size={33}  />
    </View>
    <View style={styles.label}>
      <Text style={{fontSize: 20,color: '#FFFFFF',fontWeight:'bold'}}>Top Categories</Text>
    </View>
    <View style={styles.tcboxes}>
        <View style={styles.tcicons}>
          <Icon name="mobile" size={50} color={'#FFFFFF'}/>
        </View>
        <View style={styles.tcicons}><Icon name="tv" size={40} color={'#FFFFFF'} /></View>
        <View style={styles.tcicons} ><Icon name="car" size={40} color={'#FFFFFF'}/></View>
        <View  style={styles.tcicons}><Icon name="motorcycle" size={40} color={'#FFFFFF'}/></View>
    </View>
    <View style={styles.tcboxes}>
        <View style={styles.tcicons}><Icon name="headphones" size={50} color={'#FFFFFF'}/></View>
        <View style={styles.tcicons}><Icon name="camera-retro" size={40} color={'#FFFFFF'}/></View>
        <View style={styles.tcicons} ><Icon name="building" size={40} color={'#FFFFFF'}/></View>
        <View  style={styles.tcicons}><Icon name="gamepad" size={40} color={'#FFFFFF'}/></View>
    </View>
    <View style={{alignItems:'center'}}>
    <View style={{backgroundColor:'#FED766',marginTop:20,width:'30%',borderRadius:9,padding:3}}>
      <Text style={{textAlign: 'center',fontSize: 20,color: '#000000',fontWeight:'bold'}}>For You!</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
     <View style={styles.imgbox}> 
    <Image source={require('../assets/white-offroader-jeep-parking.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 25,fontSize: 15,fontWeight:'bold'}}>White defender</Text>
    <Text style={{color: '#FED766',marginLeft: 35,fontSize: 15}}>₹10,00,000</Text>
    </View>
    <View style={styles.imgbox}> 
    <Image source={require('../assets/black-motorcycle-white.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 25,fontSize: 15,fontWeight:'bold'}}> Bajaj Avenger</Text>
    <Text style={{color: '#FED766',marginLeft: 35,fontSize: 15}}> ₹1,20,000</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
     <View style={styles.imgbox}> 
    <Image source={require('../assets/black-motorcycle-white.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 25,fontSize: 15,fontWeight:'bold'}}> Bajaj Avenger</Text>
    <Text style={{color: '#FED766',marginLeft: 35,fontSize: 15}}> ₹1,00,000</Text>
    </View>
    <View style={styles.imgbox}> 
    <Image source={require('../assets/white-offroader-jeep-parking.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 25,fontSize: 15,fontWeight:'bold'}}>White defender</Text>
    <Text style={{color: '#FED766',marginLeft: 35,fontSize: 15}}>₹10,00,000</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    </View>
    <View style={{alignItems:'center'}}>
    <View style={styles.footerbar}>
    <TouchableOpacity style={{width:'10%',marginTop:5,marginLeft:7.5}}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="user" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
    <TouchableOpacity style={{width:'12%',marginTop:5}}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="suitcase" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'20%'}}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="plus" size={50} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'12%',marginTop:5}}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="comment" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'10%',marginTop:5,marginRight:7.5}}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="exclamation" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  </View>

    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#272727',
      height: '100%',
      width:'100%'
    },
    
    header:{
      flexDirection:'row',
      borderBottomWidth: 3,
      borderBottomColor: '#FED766'
    } ,
    
    logobox:{
      height:40,
      width:40,
      backgroundColor:'#FED766',
      marginTop: 48,
      marginLeft: 15,
      borderRadius:5,
      alignItems:'center',
      justifyContent:'center'
    },
    
    logo:{
      height:38,
      width:38,
      borderRadius:5
    },
    
    search:
    {
      fontSize: 20,
      borderWidth: 2,
      borderColor: '#FED766',
      borderRadius: 10,
      marginTop: 40,
      marginLeft: 20,
      width: 270,
      paddingLeft: 10,
      marginBottom:20,
      color:'#FFFFFF'
    },
    
    icon1:{
       color:"#FED766",
       marginTop: 50,
       marginLeft: 20 
    },
    
    icon2: {
      color:"#FED766",
      marginLeft: 15,
      marginTop: 50,
    },
    
    label: {
      alignItems: 'center',
      marginTop: 10,
      paddingBottom:10,
      borderBottomWidth: 3,
      borderBottomColor: '#FED766'
    },
    
    tcboxes:{
      flexDirection:'row',
      justifyContent: 'space-evenly',
      height: '10%'
    },
    
    tcicons:
    {
      width: '20%',
      borderRightWidth: 5,
      borderLeftWidth: 5,
      borderRightColor: '#FED766',
      borderLeftColor: '#FED766',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:55,
      marginTop:10,
      margin:5
    },
    
    img: {
      height: 150,
      width:150,
      borderWidth:3,
      borderRadius:10,
      borderColor: '#FED766'
    },
    
    imgbox: {
      marginTop: 20,
    },
    
    footerbar:{
      flexDirection:'row',
      height: 50,
      width: '100%',
      backgroundColor:'#FED766',
      marginTop: 30,
      justifyContent:'space-between',
      borderRadius:15
    }
    });
    
      