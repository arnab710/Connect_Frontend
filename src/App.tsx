import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Loader from "./features/ScreenLoader/Loader";

const App: React.FC = () => {
	const queryClient = new QueryClient();

	const Home = lazy(() => import("./pages/Home/Home"));
	const ProtectedLayout = lazy(() => import("./features/ProtectedLayout/ProtectedLayout"));
	const MyProfile = lazy(() => import("./pages/EachProfile/EachProfile"));
	const ProfileSetting = lazy(() => import("./pages/ProfileUpdatePage/ProfileSetting"));
	const Login = lazy(() => import("./pages/Login/Login"));
	const Signup = lazy(() => import("./pages/Signup/Signup"));
	const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"));
	const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
	const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

	return (
		<QueryClientProvider client={queryClient}>
			{import.meta.env.VITE_APP_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" element={<ProtectedLayout />}>
							<Route index element={<Home />} />
							<Route path="/profile/:userID" element={<MyProfile />} />
							<Route path="/profileSetting" element={<ProfileSetting />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/Reset-Password/:resetToken" element={<ResetPassword />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
			<Toaster
				position="bottom-center"
				gutter={20}
				containerStyle={{ margin: "10px" }}
				toastOptions={{
					success: { duration: 2000 },
					error: { duration: 3000 },
				}}
			/>
		</QueryClientProvider>
	);
};

export default App;
