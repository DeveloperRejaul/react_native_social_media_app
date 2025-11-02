 
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import Header from '@/src/core/components/Header'
import { gStyles } from '@/src/core/styles/styles'
import { useGetPostsQuery, useLazyGetPostsByPageQuery } from '@/src/core/rtk/api'
import { Post } from '@/src/types'
import PostCard from '@/src/core/components/PostCard'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { bottomSheet } from '@/src/core/components/BottomSheet'
import FilterPost from '@/src/core/components/FilterPost'

interface ScreenLoadingProps  {
  style?: ViewStyle
}

let page = 1;
const limit = 10;

export default function Index() {
 const[userId, setUserId] = useState<string | null>(null)
 const {data, refetch, isLoading,isFetching} = useGetPostsQuery({userId})
 const [get, res] = useLazyGetPostsByPageQuery()


  const [refreshing, setRefreshing] = React.useState(false);

  const handleFilter = (id: string) => {
    bottomSheet.hide();
    setUserId(id);
    page =1;
    refetch()
  }

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      page = 1;
      refetch()
        .then(()=>{
          setRefreshing(false);
        })
        .catch(()=> {
          setRefreshing(false);
        });
    }, [refetch]);
  
    const handleMore = async () => {
      if (isFetching || isLoading || res.isFetching || res.isLoading || !data?.data?.posts ||  (data?.data?.posts && data.data?.posts?.length < limit)) return;
      if(res?.data?.data && !((res.data.data.posts?.length || 0) >= limit)) {
        return;
      }
  
      page += 1;
      get({ page, limit, userId});
    };


  const renderItem = ({item, index}: {item:Post, index: number}) => {
    return <PostCard {...{...item, userId}}/>
  }

  return (
    <View style={{flex: 1}}>
      <Header 
        title='Social Media' 
        rightComponent={(
          <View style={{flexDirection:"row", columnGap: 10}}>
            <TouchableOpacity>
              <Feather name="plus-square" size={24} color="black" onPress={() => router.push({pathname: '/(stack)/CreatePost', params:{userId}})}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> bottomSheet.show({render: <FilterPost  onChange={handleFilter}/>})}>
              <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={gStyles.container}>
         <FlatList
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
            data={data?.data?.posts || []}
            onEndReached={handleMore}
            keyExtractor={(item, index) => item.id.toString() + index}
            onEndReachedThreshold={0.1}
            contentContainerStyle={styles.container}
            ListEmptyComponent={(!data && (isLoading || isFetching)) ? <ScreenLoading style={styles.empty}/> : <Text style={styles.empty}>No data found</Text>}
            ListFooterComponent={(res.isLoading || res.isFetching) ? <ActivityIndicator size="small" color="#000" /> : null}
            />
      </View>
    </View>
  )
}

function Empty () {}

function ScreenLoading(props: ScreenLoadingProps) {
  return (
    <View style={{ flex:1,justifyContent:'center', alignItems:'center', ...props.style}}>
      <ActivityIndicator size={'large'}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    paddingBottom: 100,
  },
  empty:{
    paddingTop: 20,
    textAlign:'center',
  },
});
  