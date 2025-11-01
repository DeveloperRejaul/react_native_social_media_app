import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCommentMutation } from '@/src/core/rtk/api'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import AnimatedInput from '@/src/core/components/AnimatedInput'
import Header from '@/src/core/components/Header'
import Button from '@/src/core/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Colors } from '@/src/core/constants/theme'
import { rules } from '@/src/core/constants/rules'

export default function Comment() {
const params = useLocalSearchParams<{data:string}>();
  const [handleComment, {isLoading}] = useCommentMutation()

 const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  })
  const onSubmit = (data: {content:string}) => {
    const {id, userId} = JSON.parse(params.data || "{}");
    handleComment({...data, id,  userId})
  }
  return (
    <View>
      <Header title='Comment' bankable/>
      <View style={styles.container}>
          <Controller
              name="content"
              control={control}
              rules={rules.name}
              render={({ field: { onChange, value } }) => (
                  <AnimatedInput 
                  label='Comment'
                  placeholder='Type comment' 
                  onChangeText={onChange} 
                  value={value} 
                  error={errors?.content?.message}
                  multiline
                  containerStyle={{height: 100}}
                  />
              )}
          />
          <Button 
            isDisabled={isLoading}
            text={isLoading ? "Loading..." :'Comment'}
            textStyle={{textAlign:"center", width:"100%", color: Colors.light.background}}
            onPress={handleSubmit(onSubmit)}
         />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical :10,
    rowGap: 10

  }
})