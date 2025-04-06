import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Home({ navigation }){
    return(
        <View style={styles.container}>
    <ScrollView>
    <View style={styles.header}>
      <View style={styles.logobox}>
          <Image style={styles.logo} source={require('../assets/rebazaar.jpg')}></Image>
      </View>
      <TextInput style={styles.search} placeholder='Search' placeholderTextColor={'#FFFFFF'}></TextInput>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon style={styles.icon2} name="cart-plus" size={33}  />
      </TouchableOpacity>
      
    </View>
    <View style={styles.label}>
      <Text style={{fontSize: 20,color: '#FFFFFF',fontWeight:'bold'}}>Top Categories</Text>
    </View>

    <View style={styles.tcboxes}>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Mobile')}>
        <Icon name="mobile" size={50} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('TV')}>
        <Icon name="tv" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Car')}>
        <Icon name="car" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Motorcycle')}>
        <Icon name="motorcycle" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>

    <View style={styles.tcboxes}>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Headphones')}>
        <Icon name="headphones" size={50} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Camera')}>
        <Icon name="camera-retro" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('RealEstate')}>
        <Icon name="building" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tcicons} onPress={() => navigation.navigate('Games')}>
        <Icon name="gamepad" size={40} color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>

    <View style={{alignItems:'center'}}>
    <View style={{backgroundColor:'#FED766',marginTop:20,width:'30%',borderRadius:9,padding:3}}>
      <Text style={{textAlign: 'center',fontSize: 20,color: '#000000',fontWeight:'bold'}}>Hot picks!</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <TouchableOpacity style={styles.imgbox}>
     <View > 
    <Image source={require('../assets/white-offroader-jeep-parking.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 45,fontSize: 15,fontWeight:'bold'}}>White defender</Text>
    <Text style={{color: '#FED766',marginLeft: 55,fontSize: 15}}>₹10,00,000</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.imgbox}>
    <View > 
    <Image source={require('../assets/black-motorcycle-white.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 45,fontSize: 15,fontWeight:'bold'}}> Bajaj Avenger</Text>
    <Text style={{color: '#FED766',marginLeft: 60,fontSize: 15}}> ₹1,20,000</Text>
    </View>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <TouchableOpacity style={styles.imgbox}>
     <View > 
    <Image source={require('../assets/2024-toyota-supra-45th-anniversary-edition_100889287_h.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 45,fontSize: 15,fontWeight:'bold'}}> Toyota Supra</Text>
    <Text style={{color: '#FED766',marginLeft: 60,fontSize: 15}}> ₹9,00,000</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.imgbox}>
    <View > 
    <Image source={require('../assets/royal-enfield-continental-gt-650-twin-1567499781.jpg')} style={styles.img}></Image>
    <Text style={{color: '#FFFFFF',marginLeft: 35,fontSize: 15,fontWeight:'bold'}}>Continental Gt650</Text>
    <Text style={{color: '#FED766',marginLeft: 65,fontSize: 15}}>₹1,70,000</Text>
    </View>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    </View>
    <View style={{alignItems:'center'}}>
    <View style={styles.footerbar}>
    <TouchableOpacity style={{width:'10%',marginTop:5,marginLeft:7.5}} onPress={() => navigation.navigate('Home')}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="home" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
    <TouchableOpacity style={{width:'12%',marginTop:5}}  onPress={() => navigation.navigate('Profile')}>
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="user" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'20%'}} onPress={() => navigation.navigate('AddProduct')}>
        <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
          <Icon name="plus" size={50} color={'#FED766'}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'12%',marginTop:5}} >
      <View style={{backgroundColor:'#000000',alignItems:'center',borderRadius:10}}>
       <Icon name="comment" size={40} color={'#FED766'}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:'10%',marginTop:5,marginRight:7.5}} onPress={() => navigation.navigate('Aboutus')}>
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
      justifyContent : "space-evenly",
      borderBottomWidth: 3,
      borderBottomColor: '#FED766'
    } ,
    
    logobox:{
      height:40,
      width:40,
      backgroundColor:'#FED766',
      marginTop: 48,
      marginLeft: 0,
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
      marginLeft: 0,
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
      marginLeft:0,
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
      width:180,
      borderWidth:3,
      borderRadius:10,
      borderColor: '#FED766',
      
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
    
      