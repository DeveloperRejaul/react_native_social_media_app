import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useGetUsersQuery } from '../rtk/api'

interface FilterPostProps {
  onChange: (id:string)=> void 
}

export default function FilterPost(props:FilterPostProps) {
  const {onChange} = props
  const {data, isLoading} = useGetUsersQuery({})
  const users = data?.data || []

  return (
    <View style={styles.container}> 
       {users.map((user, index) => (
        <TouchableOpacity key={`${user.id}-${index}`} onPress={() => onChange(user.id)}>
          <Text>{user.name}</Text>
       </TouchableOpacity>
      ) )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    paddingBottom: 20,
    paddingTop: 20,
    rowGap: 5
  }
})