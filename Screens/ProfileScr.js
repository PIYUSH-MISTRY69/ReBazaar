import { StyleSheet, Text, SafeAreaView,View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';





function ProfileScreeen()
{
return  <> 

<ScrollView>
<View style = {styles.header} >
        <Text style = {styles.headerTitle}>About</Text>
    </View>
    

 <View style = {styles.Maincontainer}>
 
    <View style = {styles.container}>
        <StatusBar style='light'/>
       
        <AboutContainer/>
      
            </View>
     
</View>
</ScrollView>
</>
}
export default ProfileScreeen;
const styles = StyleSheet.create({
    Maincontainer: {
      flex: 1,
      backgroundColor: 'white'
      
    },
    container: {
        flex:1,
      backgroundColor: '#ebebeb'
      
    },
    header: {
      width: '100%',
      height: 150,
      flexDirection:'row',
      backgroundColor: '#1d1f3c',
      justifyContent: 'flex-start',
      alignItems:'center',
      borderBottomRightRadius:28,
      borderBottomLeftRadius:28,
    
      padding:16,
      elevation: 4,
     
    },
    headerTitle: {
      color: 'white',
      fontSize: 32,
      margin:12,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 16,
      marginTop: 5,
    },
  });