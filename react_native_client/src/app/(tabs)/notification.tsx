import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/src/core/components/Header'
import { gStyles } from '@/src/core/styles/styles'

export default function Profile() {
  return (
    <View style={{flex: 1}}>
        <Header title='Notification'/>
        <View style={gStyles.container}>
            <Text>Notification</Text>
        </View>
    </View>
  )
}