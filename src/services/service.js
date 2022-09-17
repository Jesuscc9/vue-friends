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
	getPosts: async () => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.select(`*, profiles (
				*
			)`))
	}, createPost: async (body) => {
		return supabaseWrapper(() => supabase
			.from('posts')
			.insert([body]))
	}, insertPostPicture: async ({ filePath, file }) => {
		return supabaseWrapper(() => supabase.storage.from('posts').upload(filePath, file))
	}
}