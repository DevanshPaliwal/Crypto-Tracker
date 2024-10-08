import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'


const Page = () => {
    const [assets]=useAssets([require('@/assets/videos/intro.mp4')])

  return (
    <View style={styles.container}>
      {
        assets && (
          <Video source={{uri:assets[0].uri}} style={{width:300,height:300}} />
        )
      }
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
})

export default Page