import React, { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const LoginPopUp = ({ setshowLogin }) => {
	const { url, setToken, token } = useContext(StoreContext);
	const [currentState, setcurrentState] = useState("sign up");
	const [data, setdata] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setdata((data) => ({ ...data, [name]: value }));
	};

	const onLogin = async (event) => {
		event.preventDefault();


		let newUrl = url;
		if (currentState === "login") {
			newUrl += "/api/user/login";
		} else {
			newUrl += "/api/user/register";
		}
		console.log(newUrl);


		// const response = await axios.post(newUrl, data);
		const response = await axios.post(newUrl, data);
		console.log(response);

		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem("token", response.data.token);
			setshowLogin(false);
		} else {
			alert(response.data.message);
		}
	};

	// useEffect(() => {
	//   console.log(data);
	// }, [data]);


	return (
		<div className="login-popup">
			<form onSubmit={onLogin} className="login-popup-container">
				<div className="login-popup-tittle">
					<h2>{currentState}</h2>
					<img
						onClick={() => setshowLogin(false)}
						src={assets.cross_icon}
						alt=""
					/>
				</div>
				<div className="login-popup-input">
					{currentState === "login" ? (
						<></>
					) : (
						<input
							name="name"
							onChange={onChangeHandler}
							value={data.name}
							type="text"
							placeholder="Your name "
							required
						/>
					)}

					<input
						name="email"
						onChange={onChangeHandler}
						value={data.email}
						type="email"
						placeholder="Your email "
						required
					/>
					<input
						name="password"
						onChange={onChangeHandler}
						value={data.password}
						type="password"
						placeholder="Yourn password "
						required
					/>
				</div>
				<button type="submit">
					{currentState === "sign up" ? "create account" : "login"}
				</button>
				<div className="login-popup-condition">
					<input type="checkbox" required />
					<p>By continuing, i agree to the term of use & privact policy</p>
				</div>

				{currentState === "login" ? (
					<p>
						Create a new account ?{" "}
						<span onClick={() => setcurrentState("sign up")}>Click here</span>
					</p>
				) : (
					<p>
						Already have an account?{" "}
						<span onClick={() => setcurrentState("login")}>Login here</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPopUp;
