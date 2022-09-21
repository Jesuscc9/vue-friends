/* eslint-disable camelcase */
import { supabase } from './supabase'

const supabaseWrapper = async (fn) => {
  try {
    const data = await fn()
    return data
  } catch (e) {
    return e
  }
}

const currentId = supabase.auth.user()?.id

export const service = {
  getProfile: () => {
    return currentId
      ? supabaseWrapper(() =>
        supabase.from('profiles').select('*').eq('id', currentId)
      )
      : null
  },
  getPosts: () => {
    return supabaseWrapper(() =>
      supabase
        .from('posts')
        .select(
          `*, profiles (
				*
			), likes (
				*
			), comments (
        *, profiles (
          *
        )
      )`
        )
        .order('id', { ascending: false })
    )
  },
  createPost: (body) => {
    return supabaseWrapper(() => supabase.from('posts').insert([body]).single())
  },
  insertPostPicture: ({ filePath, file }) => {
    return supabaseWrapper(() =>
      supabase.storage.from('posts').upload(filePath, file)
    )
  },
  deletePost: async (postId) => {
    await supabase.from('likes').delete().eq('post_id', postId)
    await supabase.from('comments').delete().eq('post_id', postId)
    return supabaseWrapper(() =>
      supabase.from('posts').delete().eq('id', postId)
    )
  },
  updatePost: (postId, body) => {
    return supabaseWrapper(() =>
      supabase.from('posts').update(body).eq('id', postId)
    )
  },
  uploadUserAvatar: (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    return supabaseWrapper(() =>
      supabase.storage.from('avatars').upload(filePath, file)
    )
  },
  likePost: (postId) => {
    return supabaseWrapper(() =>
      supabase.from('likes').insert({ post_id: postId }).single()
    )
  },
  dislikePost: (likeId) => {
    return supabaseWrapper(() =>
      supabase.from('likes').delete().eq('id', likeId)
    )
  }, commentPost: (postId, comment) => {
    return supabaseWrapper(() => supabase.from('comments').insert({ post_id: postId, body: comment }))
  }
}
