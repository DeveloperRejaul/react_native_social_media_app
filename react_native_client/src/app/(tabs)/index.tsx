import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/src/core/components/Header'
import { gStyles } from '@/src/core/styles/styles'

export default function Index() {
  return (
    <View style={{flex: 1}}>
      <Header title='Social Media'/>
      <View style={gStyles.container}>
        <Text>index</Text>
      </View>
    </View>
  )
}