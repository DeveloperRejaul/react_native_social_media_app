import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useMeQuery } from '@/src/core/rtk/api'

export default function Index() {
  useMeQuery({})
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})