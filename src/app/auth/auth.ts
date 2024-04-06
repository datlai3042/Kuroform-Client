class Auth {
	static isAuthentication: boolean = false;

	static onLogin() {
		Auth.isAuthentication = true;
	}

	static onLogout() {
		Auth.isAuthentication = false;
	}
}

export default Auth;
