import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Post } from '@/src/types'
import { Colors } from '../constants/theme'
import { useLikeMutation } from '../rtk/api'
import { router } from 'expo-router'
 
interface PostCardProps extends Omit<Post, "userId" >{
  userId: string | null
}


export default function PostCard(post: PostCardProps) {
  const [handleLike]=  useLikeMutation()
  const {user, content, likes, comments, id , userId} = post || {};

  return (
    <View
        style={{
          backgroundColor: Colors.light.background,
          borderRadius: 12,
          padding: 16,
          marginVertical: 8,
          shadowColor: Colors.light.text,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        }}
    >
      {/* Author */}
      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
        {user?.name || 'Unknown Author'}
      </Text>

      {/* Content */}
      <Text style={{ fontSize: 14, marginBottom: 12 }}>{content}</Text>

      {/* Like + Comment Info */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12
        }}
      >
        <Text style={{ fontSize: 13, color: Colors.light.icon }}>
          ❤️ {likes?.length || 0} Likes
        </Text>
        <Text style={{ fontSize: 13, color: Colors.light.icon}}>
          💬 {comments?.length || 0} Comments
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderTopWidth: 1,
          borderTopColor: Colors.light.background,
          paddingTop: 8
        }}
      >
        <TouchableOpacity onPress={() => handleLike({id, userId})}>
          <Text style={{ fontWeight: '600', color: Colors.light.tabIconSelected}}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push({pathname:"/(stack)/comment", params:{ data: JSON.stringify({id, userId})}})}>
          <Text style={{ fontWeight: '600', color: Colors.light.tabIconSelected}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}