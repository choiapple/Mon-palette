import NavigationBarHeader from "./NavigationBar/NavigationBarHeader";
import NavigationBarBottom from "./NavigationBar/NavigationBarBottom";
import FeedMain from "./Feed/FeedMain";
import SearchResult from "./SearchResult/SearchResult";
import Home from "./Home/Home";
import Search2 from "./Search/Search2";
import LoginForm from "./user/components/LoginForm";
import SignUp from "./user/components/SignUp";
import SignUpForm from "./user/components/SignUpForm";
import ChangeNickname from "./user/components/ChangeNickname";
import ChangePassword from "./user/components/ChangePassword";
import ChangeAddress from "./user/components/ChangeAddress";
import ChangePhone from "./user/components/ChangePhone";
import ChangeInfo from "./user/components/ChangeInfo";
import UserPage from "./user/components/UserPage";
import FollowingList from "./user/components/FollowingList";
import FollowerList from "./user/components/FollowerList";
import FeedWrite from "./Feed/FeedWrite";
import FeedEdit from "./Feed/FeedEdit";
import ChallengeHome from "./Challenge/ChallengeHome";
import FeedDetail from "./Feed/FeedDetail/FeedDetail";
import ChallengeCreate from "./Challenge/ChallengeCreate";
import MakeUpStart from "./AIMakeUp/MakeUpStart";
import StartPage from "./PersonalColor/StartPage";
import ChallengeDetail from "./Challenge/ChallengeDetail"
import ChallengeEdit from './Challenge/ChallengeEdit';

import { Routes, Route } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={[<NavigationBarHeader title="login" />, <LoginForm />]}
				/>
				<Route
					path="/home"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<Home />,
						<NavigationBarBottom />,
					]}
				/>

				<Route
					path="/feed/"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<NavigationBarBottom />,
						<FeedMain />,
					]}
				/>
				{/* path={`/search/${검색결과 변수이름}`} */}
				{/* 네비 헤더 부분 빠지고 검색창의 top 부분 들어가야함 */}
				<Route
					path="/search/"
					element={[<NavigationBarBottom />, <Search2 />]}
				/>

				<Route
					path="/result"
					element={[<NavigationBarBottom />, <SearchResult />]}
				/>
				<Route
					path="/signup"
					element={[<NavigationBarHeader title="Sign up" />, <SignUp />]}
				/>
				<Route
					path="signupform"
					element={[<NavigationBarHeader title="Sign up" />, <SignUpForm />]}
				/>
				<Route
					path="/changenickname"
					element={[
						<NavigationBarHeader title="ChangeNickname" />,
						<ChangeNickname />,
						<NavigationBarBottom />,
					]}
				/>
				<Route
					path="/changepassword"
					element={[
						<NavigationBarHeader title="ChangePassword" />,
						<ChangePassword />,
						<NavigationBarBottom />,
					]}
				/>
				<Route
					path="/changephone"
					element={[
						<NavigationBarHeader title="ChangePhone" />,
						<ChangePhone />,
						<NavigationBarBottom />,
					]}
				/>
				<Route
					path="/changeaddress"
					element={[
						<NavigationBarHeader title="ChangeAddress" />,
						<ChangeAddress />,
						<NavigationBarBottom />,
					]}
				/>
				<Route
					path="/changeinfo"
					element={[
						<NavigationBarHeader title="Edit profile" />,
						<NavigationBarBottom />,
						<ChangeInfo />,
					]}
				/>
				<Route
					path="/userpage/:id"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<NavigationBarBottom />,
						<UserPage />,
					]}
				/>

				<Route
					path="/userpage/following/:id"
					element={[
						<NavigationBarHeader title="following" />,
						<NavigationBarBottom />,
						<FollowingList />,
					]}
				/>

				<Route
					path="/userpage/follower/:id"
					element={[
						<NavigationBarHeader title="follower" />,
						<NavigationBarBottom />,
						<FollowerList />,
					]}
				/>
				<Route
					path="/feed/write"
					element={[<NavigationBarBottom />, <FeedWrite />]}
				/>
				<Route
					path="/challenge"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<NavigationBarBottom />,
						<ChallengeHome />,
					]}
				/>
				<Route
					path="/feed/edit/:id"
					element={[<NavigationBarBottom />, <FeedEdit />]}
				/>

				
				<Route
					path="/feed/:feedId"
					element={[
						<NavigationBarHeader title="Mon, Palette" />,
						<FeedDetail />,
						<NavigationBarBottom />
					]}
				/>

				<Route
					path="/challenge/create"
					element={[
						<NavigationBarBottom />,
						<ChallengeCreate />
					]}
				/>
				<Route path="/AImakeup" element={[<MakeUpStart />]} />

				<Route
					path="/personalcolor"
					element={[
						<StartPage />
					]}
				/>

				<Route
					path="/challenge/:challengeId"
					element={[
						<ChallengeDetail />,
						<NavigationBarBottom />,
					]}
				/>

				<Route
					path="/challenge/edit/:id"
					element={[<NavigationBarBottom />, <ChallengeEdit />]}
				/>
		
			</Routes>
		</div>
	);
}

export default App;
