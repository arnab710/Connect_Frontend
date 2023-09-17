import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./features/ProtectedLayout/ProtectedLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{import.meta.env.VITE_APP_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProtectedLayout />}>
						<Route index element={<Home />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
			<Toaster
				position="bottom-center"
				gutter={20}
				containerStyle={{ margin: "10px" }}
				toastOptions={{
					success: { duration: 1500 },
					error: { duration: 3000 },
				}}
			/>
		</QueryClientProvider>
	);
};

export default App;
