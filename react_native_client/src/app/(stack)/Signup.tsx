import { StyleSheet,View } from 'react-native'
import React from 'react'
import AnimatedInput from '@/src/core/components/AnimatedInput'
import Header from '@/src/core/components/Header'
import Button from '@/src/core/components/Button'
import { Colors } from '@/src/core/constants/theme'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useSignUpMutation } from '@/src/core/rtk/api'
import { SignupBody } from '@/src/types'
import { rules } from '@/src/core/constants/rules'

export default function Signup() {
      const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email: "",
        password: "",
        name:"",
        confirmPassword:""
      },
    })
    const [handleSignup, {isLoading}] = useSignUpMutation()
    const onSubmit = (data: SignupBody) => {
      handleSignup(data)
    }
  
  return (
    <View style={{flex:1}}>
      <Header title='Signup'/>
      <View style={styles.container}>
        {/* Name */}
      <Controller
        name="name"
        control={control}
        rules={rules.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <AnimatedInput
            label="Name"
            placeholder="Type name"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors?.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={rules.email}
        render={({ field: { onChange, onBlur, value } }) => (
          <AnimatedInput
            label="Email"
            placeholder="Type email"
            onChangeText={onChange}
            onBlur={onBlur}
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
            label="Password"
            placeholder="Type password"
            inputType="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors?.password?.message}
          />
        )}
      />


      <Controller
        name="confirmPassword"
        control={control}
        rules={rules.confirmPassword}
        render={({ field: { onChange, onBlur, value } }) => (
          <AnimatedInput
            label="Confirm Password"
            placeholder="Type password"
            inputType="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors?.confirmPassword?.message}
          />
        )}
      />
        <Button 
          isDisabled={isLoading}
          text={isLoading ? "Loading..." : 'Signup'}
          textStyle={{textAlign:"center", width:"100%", color: Colors.light.background}}
          onPress={handleSubmit(onSubmit)}
         />
         <Button 
            onPress={()=> router.push('/(stack)/Login')}
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



     