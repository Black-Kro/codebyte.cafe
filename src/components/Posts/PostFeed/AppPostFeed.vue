<template>
  <div v-for="(post, index) in posts" :key="post.id">
    <app-post :post="post" />
    <kro-divider v-if="index < posts.length - 1" class="my-0" />
  </div>
</template>

<script lang="ts" setup="props">
import { GET_POSTS } from '/~/apollo/query'
import { useQuery, useResult } from '@black-kro/use-apollo'
// import { defaultPaginationUpdateQuery } from '/~/composables/usePagination'

declare const props: {
  /*
  * Possible Options: home, explore, @*
  *
  * home: Sources the users homepage feed.
  * explore: Sources the global feed showing posts from everyone
  * {uid}: Sources the child posts from a parent with given uid
  * @*: Sources a user profile for posts. ex: @wheat
  **/
  source?: string

  /** The amount of posts to load */
  take?: number

  /** Should the replies be loaded? */
  replies?: boolean

  /** If set to true, posts will be updated as things like replies, upvotes, and downvotes change */
  keepAlive?: boolean
}

const sourceType = (source: string) => {
  if (source.includes('@')) return { type: 'user', value: source }
  if (source === 'home') return { type: 'home', value: source }
  if (source === 'explore') return { type: 'explore', value: source }
  if (source.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) return { type: 'parent', value: source }
  return { type: 'unknown', value: null }
}

const sourceToParameters = (source: string) => {
  const { type, value } = sourceType(source)

  if (type === 'user') return { username: value }
  if (type === 'home') return {} // TODO: Update parameters when server supports home feed
  if (type === 'explore') return {} // TODO: Update parameters when server supports explore feed
  if (type === 'parent') return { parent: value }

  return {}
}

export const { result, loading, error, fetchMore, subscribeToMore } = useQuery(
  GET_POSTS,
  { take: props.take || 10, ...sourceToParameters(props.source || '') },
  { fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true })

export const posts = useResult(result, [], data => data.posts.nodes)

</script>
