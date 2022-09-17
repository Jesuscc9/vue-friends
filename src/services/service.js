import { supabase } from './supabase'

const supabaseWrapper = async (fn) => {
	try {
		const data = await fn()
		return data
	} catch (e) {
		return e
	}
}

export const service = {
	getPosts: () => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.select(`*, profiles (
				*
			)`))
	}, createPost: (body) => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.insert([body]).single())
	}, insertPostPicture: ({ filePath, file }) => {
		return supabaseWrapper(() => supabase.storage.from('posts').upload(filePath, file))
	}, deletePost: (id) => {
		return supabaseWrapper(() => supabase.from('posts').delete().eq('id', id))
	}
}