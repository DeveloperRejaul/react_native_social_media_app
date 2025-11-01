import { StyleSheet, View } from 'react-native'
import React from 'react'
import {useCreatePostMutation } from '@/src/core/rtk/api'
import AnimatedInput from '@/src/core/components/AnimatedInput'
import Header from '@/src/core/components/Header'
import Button from '@/src/core/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Colors } from '@/src/core/constants/theme'
import { rules } from '@/src/core/constants/rules'
import { useGlobalSearchParams } from 'expo-router'

export default function CratePost() {
  const [handlePost, {isLoading}] = useCreatePostMutation()
  const {userId} =useGlobalSearchParams()

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
   handlePost({...data, userId: userId as string | null })
  }
  return (
    <View>
      <Header title='Create post' bankable/>
      <View style={styles.container}>
          <Controller
              name="content"
              control={control}
              rules={rules.name}
              render={({ field: { onChange, onBlur, value } }) => (
                  <AnimatedInput 
                  label='Post'
                  placeholder='Type post' 
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
            text={isLoading ? "Loading..." :'Create Post'}
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