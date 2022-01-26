import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { useForm } from "react-hook-form";



const MyPosts = (props) => {

	let postsElement = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />)

	return (
		<div className={s.postsBlock}>
			<div>
				<h3>
					My posts
				</h3>
				<div>
					<AddPostForm {...props} />
				</div>
				<div className={s.messageBlock}>
					{postsElement}
				</div>
			</div>
		</div>
	)
}

const AddPostForm = (props) => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: 'onBlur'});
	const onSubmit = data => {
		props.addPost(data.post)
		reset();
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={s.formBlock}>
				<textarea className={errors?.post && s.error} {...register("post", {
					required: 'Field is requared',
					maxLength: {
						value: 30,
						message: 'Max length is 30 symbols'}
				})} />
			</div>
			<div style={{color: 'red'}}>
				{errors?.post && <p>{errors?.post?.message || "Error!"}</p>}
			</div>
			<div>
				<input type="submit" value="Add post" />
			</div>
		</form>
	)
}

export default MyPosts;