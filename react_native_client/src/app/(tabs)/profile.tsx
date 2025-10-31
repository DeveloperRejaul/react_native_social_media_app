import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/src/core/components/Header'
import { gStyles } from '@/src/core/styles/styles'

export default function Profile() {
  return (
    <View style={{flex: 1}}>
        <Header title='Profile'/>
        <View style={gStyles.container}>
            <Text>profile</Text>
        </View>
    </View>
  )
}