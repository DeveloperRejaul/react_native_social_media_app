import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'
import React, { ReactNode } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';


interface HeaderProps {
    title: string;
    rightComponent?: ReactNode,
    bankable?:boolean
}


export default function Header(props: HeaderProps) {
  const {title, rightComponent, bankable} = props
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {bankable ? <TouchableOpacity onPress={()=> router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
    },
    left:{
      flexDirection:"row",
      alignItems:"center",
      columnGap: 10
    }
})