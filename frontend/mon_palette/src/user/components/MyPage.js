import React, { useState, useEffect } from "react";
import "./MyPage.css"; // 스타일 파일 임포트
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [feedcnt, setFeedCnt] = useState("");
	const [follower, setFollower] = useState("");
	const [following, setFollowing] = useState("");
	const [isinfluence, setIsInfluence] = useState("");
	const [getinfo, setGetInfo] = useState("Feed");
	const Authorization = useRecoilValue(loginState);
	const Navigate = useNavigate();
	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/mypage`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response.data);
				if (response.data !== null) {
					setBackground(response.data.data.background);
					setProfile(response.data.data.profilePhoto);
					setNickname(response.data.data.nickname);
					setPersonalcolor(response.data.data.personalColor);
					setFeedCnt(response.data.data.feedCnt);
					setFollower(response.data.data.followerCnt);
					setFollowing(response.data.data.followingCnt);
					setIsInfluence(response.data.data.isInfluence);
				}
			});
	};
	useEffect(() => {
		getmapping();
		// setBackground("/static/background.jpg");
		// setProfile("/static/baseimg.png");
		// setNickname("은정이개고수33");
		// setPersonalcolor("흙톤");
		// setFeedCnt(0);
		// setFollower(0);
		// setFollowing(0);
		// setIsInfluence("USER");
	}, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.
	const AllChallengeImage = [
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s",
		"https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg",
		"https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s",
		"https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg",
		"https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s",
		"https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg",
		"https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s",
		"https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg",
	];
	return (
		<div className="mypage_container">
			<div className="mypage_background-container">
				<img
					src={background}
					alt="background"
					className="mypage_background-picture"
				/>
				<img src={profile} alt="profile" className="mypage_profile-picture" />
			</div>
			<div className="mypage_personal_info">
				<div className="mypage_personal_info_inner">
					<span className="mypage_gap"></span>
					<div>
						<label className="mypage_label">{nickname}</label>
						<div className="mypage_text-left">{personalcolor}</div>
					</div>
					<div className="mypage_personal_info_feed">
						<div className="mypage_group-left">
							<div className="mypage_group-left">게시물</div>
							<div className="mypage_cnt">{feedcnt}</div>
						</div>
						<span className="mypage_gap"></span>
						<div className="mypage_group-left">
							<div className="mypage_group-left">팔로워</div>
							<div className="mypage_cnt">{follower}</div>
						</div>
						<span className="mypage_gap"></span>
						<div className="mypage_group-left">
							<div className="mypage_group-left">팔로잉</div>
							<div className="mypage_cnt">{following}</div>
						</div>
						<span className="mypage_gap"></span>
						<span className="mypage_gap"></span>
					</div>
				</div>
			</div>

			{isinfluence === "USER" ? (
				<div className="mypage_menu_button">
					<Link to="/changenickname">
						<button className="mypage_button1">
							<AssignmentOutlinedIcon />
							<div className="mypage_group-left">주문목록</div>
						</button>
					</Link>
					<Link to="/changenickname">
						<button className="mypage_button2">
							<ShoppingCartOutlinedIcon />
							<div className="mypage_group-left">장바구니</div>
						</button>
					</Link>

					<Link to="/feedwrite">
						<button className="mypage_button3">
							<AddOutlinedIcon />
							<div className="mypage_group-left">만들기</div>
						</button>
					</Link>
					<Link to="/changeinfo">
						<button className="mypage_button4">
							<SettingsOutlinedIcon />
							<div className="mypage_group-left">정보수정</div>
						</button>
					</Link>
				</div>
			) : (
				<div>
					<div className="mypage_menu_button">
						<Link to="/feedwrite">
							<button className="mypage_button5">
								<AssignmentOutlinedIcon />
								<div className="mypage_group-left">주문목록</div>
							</button>
						</Link>
						<Link to="/feedwrite">
							<button className="mypage_button6">
								<ShoppingCartOutlinedIcon />
								<div className="mypage_group-left">장바구니</div>
							</button>
						</Link>
					</div>
					<div className="mypage_menu_button">
						<Link to="/feedwrite">
							<button className="mypage_button7">
								<AddShoppingCartOutlinedIcon />
								<div className="mypage_group-left">상품판매</div>
							</button>
						</Link>
						<Link to="/feedwrite">
							<button className="mypage_button8">
								<AddOutlinedIcon />
								<div className="mypage_group-left">만들기</div>
							</button>
						</Link>
						<Link to="/changeinfo">
							<button className="mypage_button9">
								<SettingsOutlinedIcon />
								<div className="mypage_group-left">정보수정</div>
							</button>
						</Link>
					</div>
				</div>
			)}
			<br />
			<hr className="mypage_hr" />
			<div className="mypage_menu_button">
				<button className="mypage_button_feed">Feed</button>
				<button className="mypage_button_challenge">Challenge</button>
				<button className="mypage_button_makeup">Make up</button>
			</div>
			<hr className="mypage_hr" />
			<div className="feedMain_body">
				<div className="feedMain_body_info">
					<div className="feedMain_body_container">
						{AllChallengeImage.map((challengeInfo, index) => {
							return (
								<div className="feedMain_body_info_item" key={index}>
									<img src={challengeInfo} alt="" />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeInfo;
