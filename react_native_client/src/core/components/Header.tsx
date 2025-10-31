import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

interface HeaderProps {
    title: string;
}


export default function Header(props: HeaderProps) {
  const {title} = props
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
    }
})