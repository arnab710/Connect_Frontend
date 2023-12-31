import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { format } from "date-fns";
import React, { useState, useReducer, useEffect, useRef } from "react";
import { PostPropType } from "../../Types/EachPostTypes";
import style from "./EachPost.module.css";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import toast from "react-hot-toast";
import { styleObj } from "../../components/notifications/errorStyle";
import useLike from "../../Hooks/useLike";
import { likeReducer } from "../../Reducers/PostLikeReducer";
import { likeType } from "../../Types/likeTypes";
import useDisLike from "../../Hooks/useDisLike";
import useAllCommentFetch from "../../Hooks/useAllCommentFetch";
import EachComment from "../EachComment/EachComment";
import TotalCommentSkeleton from "../totalCommentSkeleton/totalCommentSkeleton";
import CommentInput from "../CommentInput/CommentInput";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import FollowUnfollowBtn from "../../components/PostFollowUnfollowBtn/FollowUnfollowBtn";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";

const EachPost: React.FC<PostPropType> = ({ post }) => {
	const [enabler, setEnabler] = useState(false);

	const Navigate = useNavigate();

	const userDetails = useAppSelector((state) => state.user);

	const videoRef = useRef<HTMLVideoElement | null>(null);

	const { data: commentData, isLoading: isCommentLoading, isError: isCommentError } = useAllCommentFetch(enabler, post._id);

	const isVideoVisible = useIntersectionObserver(videoRef, { threshold: 0.7 });

	const initialLike: likeType = {
		likedByUser: post.alreadyLiked,
		likeCount: post.likes,
	};

	const [likeState, likeDispatch] = useReducer(likeReducer, initialLike);
	const [countComment, setCountComment] = useState<number>(post.comments);

	const { mutate: likefxn, isError: isLikeError, isLoading: isLikeLoading } = useLike(post.user._id);
	const { mutate: dislikefxn, isError: isDislikeError, isLoading: isDislikeLoading } = useDisLike(post.user._id);

	useEffect(() => {
		likeDispatch({ type: "postChange", payload: { likedByUser: post.alreadyLiked, likeCount: post.likes } });
		setCountComment(post.comments);
	}, [post.alreadyLiked, post.likes, post.comments]);

	useEffect(() => {
		if (isCommentError)
			toast.error("Something Went Wrong While Getting Comments", {
				style: styleObj,
			});
	}, [isCommentError]);

	useEffect(() => {
		if (isLikeError && likeState.likedByUser === true) {
			likeDispatch({ type: "dislike" });
		}
		if (isDislikeError && likeState.likedByUser === false) {
			likeDispatch({ type: "like" });
		}
	}, [isLikeError, isDislikeError, likeState.likedByUser]);

	useEffect(() => {
		const videoInteraction = async () => {
			if (videoRef.current) {
				try {
					if (isVideoVisible) {
						await videoRef.current.play();
					} else {
						videoRef.current.pause();
					}
				} catch (err) {
					if (import.meta.env.VITE_APP_ENV === "development") console.log(err);
				}
			}
		};

		void videoInteraction();
	}, [isVideoVisible]);

	const getProperDate = (dateToBeConverted: string) => {
		const date = new Date(dateToBeConverted);

		const properDate = date ? format(date, "MMMM d, yyyy") : "";
		return properDate;
	};

	const handlechange = (id: string) => {
		if (likeState.likedByUser === false) {
			likefxn({ id });
			likeDispatch({ type: "like" });
		} else if (likeState.likedByUser === true) {
			dislikefxn({ id });
			likeDispatch({ type: "dislike" });
		}
	};

	return (
		<div className={style.backgroundDiv}>
			<div className={style.postProfileInfo}>
				<div className={style.profilePictureDiv} onClick={() => Navigate(`/profile/${post.user._id}`)}>
					{
						<img
							src={
								post?.user?.profilePicture
									? post?.user?.profilePicture
									: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
							}
							className={style.postUserPicture}
							alt="user's photo"
						/>
					}
				</div>
				<div className={style.userInfoDiv}>
					<div>
						<p className={style.userName} onClick={() => Navigate(`/profile/${post.user._id}`)}>
							{post?.user?.firstName} {post?.user?.lastName}
						</p>
						<p className={style.userLocation}>{getProperDate(post?.createdAt)}</p>
					</div>
					{userDetails._id !== post.user._id ? <FollowUnfollowBtn postUser={post.user._id} postUserName={post.user.firstName} /> : <DeleteBtn postID={post._id} />}
				</div>
			</div>
			<section className={style.description}>{post?.description}</section>
			<section className={style.imagePostDiv}>
				{post?.picture && <img className={style.imagePost} src={post?.picture} alt="user's post" />}
				{post?.video && (
					<video ref={videoRef} className={style.videoPost} controls muted>
						className={style.videoPost}
						<source src={post?.video} type="video/mp4" />
					</video>
				)}
				{post?.audio && (
					<audio controls className={style.audioPost}>
						<source src={post.audio} type="audio/mp3" />
					</audio>
				)}
			</section>
			<section className={style.LikeAndCommentCount}>
				<div className={style.CountDiv}>
					<p>{likeState.likeCount} </p>
					<AiTwotoneHeart className={style.reactIconsHeart} />
				</div>
				<span className={style.middleDot}>·</span>

				<div className={style.CountDiv}>
					<p>{countComment} </p>
					<BiComment className={style.reactIconsComment} />
				</div>
			</section>
			<section className={style.likeCommentSection}>
				<button className={style.likeDiv} onClick={() => handlechange(post._id)} disabled={isLikeLoading || isDislikeLoading}>
					{likeState.likedByUser ? <AiTwotoneHeart className={style.reactIconsWithRed} /> : <AiOutlineHeart className={style.reactIcons} />}
					<span className={`${style.reactText} ${likeState.likedByUser && style.alreadyLiked}`}>Like</span>
				</button>
				<button
					className={style.commentDiv}
					onClick={() => {
						setEnabler(true);
					}}
				>
					<BiComment className={style.reactIcons2} />
					<span className={style.reactText}>Comment</span>
				</button>
			</section>
			{enabler && (
				<>
					<CommentInput postID={post._id} setCountComment={setCountComment} userID={post.user._id} />
					<section className={style.commentSection}>
						<h1 className={style.commentHeader}>{countComment > 0 ? `Latest Comments` : `No Comments Yet`}</h1>
						<div className={style.totalCommentDiv}>
							{isCommentLoading ? (
								<TotalCommentSkeleton />
							) : (
								commentData?.allComments?.map((eachComment) => <EachComment eachComment={eachComment} key={eachComment._id} setCountComment={setCountComment} postID={post._id} user={post.user._id} />)
							)}
						</div>
					</section>
				</>
			)}
		</div>
	);
};

export default EachPost;
