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
		return currentId ? supabaseWrapper(() => supabase.from('profiles').select('*').eq('id', currentId)) : null
	},
	getPosts: () => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.select(`*, profiles (
				*
			)`).order('id', { ascending: false }))
	}, createPost: (body) => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.insert([body]).single())
	}, insertPostPicture: ({ filePath, file }) => {
		return supabaseWrapper(() => supabase.storage.from('posts').upload(filePath, file))
	}, deletePost: (id) => {
		return supabaseWrapper(() => supabase.from('posts').delete().eq('id', id))
	}, updatePost: (id, body) => {
		return supabaseWrapper(() => supabase.from('posts').update(body).eq('id', id))
	}
}