import { StyleSheet,Text,View } from 'react-native'
import React from 'react'
import AnimatedInput from '@/src/core/components/AnimatedInput'
import Header from '@/src/core/components/Header'
import Button from '@/src/core/components/Button'
import { Colors } from '@/src/core/constants/theme'
import { router } from 'expo-router'
import { useForm, Controller } from "react-hook-form"
import { LoginBody } from '@/src/types'
import { useLoginMutation } from '@/src/core/rtk/api'
import { rules } from '@/src/core/constants/rules'


export default function Index() {
    const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [handleLogin, {isLoading}] = useLoginMutation()
  const onSubmit = (data: LoginBody) => {
    handleLogin(data)
  }


  return (
    <View style={{flex:1}}>
      <Header title='Login'/>
      <View style={styles.container}>
        <Controller
            name="email"
            control={control}
            rules={rules.email}
            render={({ field: { onChange, onBlur, value } }) => (
                <AnimatedInput 
                 label='Email'
                 placeholder='Type email' 
                 onChangeText={onChange} 
                 value={value} 
                 error={errors?.email?.message}
                />
            )}
        />
        <Controller
            name="password"
            control={control}
            rules={rules.password}
            render={({ field: { onChange, onBlur, value } }) => (
                <AnimatedInput 
                 label='Password'
                 placeholder='Type password' 
                 onChangeText={onChange} 
                 value={value} 
                 inputType='password'
                 error={errors?.password?.message}
                />
            )}
        />
        <Button 
          isDisabled={isLoading}
          text={isLoading ? "Loading..." :'Login'}
          textStyle={{textAlign:"center", width:"100%", color: Colors.light.background}}
          onPress={handleSubmit(onSubmit)}
         />
         <Button 
          onPress={()=> router.push('/(stack)/Signup')}
          text='Goto signup'
          variant='link' 
          textStyle={{textAlign:"center", width:"100%", color: Colors.light.tint}}
         />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent:"center",
    rowGap: 5
  }
})