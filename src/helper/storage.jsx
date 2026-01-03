const setAuthorization = data => {
	try {
		localStorage.setItem("authorization", data);
		return true;
	} catch (error) {
		return false;
	}
};

const getAuthorization = () => {
	try {
		const encryptedData = localStorage.getItem("authorization");
        return encryptedData;
	} catch (error) {
		return null;
	}
};

const removeAuthFromStorage = () => {
    try {
		localStorage.removeItem("authorization");
		localStorage.removeItem("profile");
		localStorage.removeItem("menus");
		document.cookie = "refresh_token=; Max-Age=0; path=/; secure; samesite=strict";
		return true
    } catch (error) {
        return false
    }
}

const logoutPage = async() => {
	try {
		const logout = await Logout();
		if (logout.status == "success") {
			removeAuthFromStorage()
		}
		return true
	} catch (error) {
		return false
	}
}

const setSSOLogin = () => {
	try {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('code') || urlParams.has('Code')) {
			const codeValue = urlParams.get('code');
			return codeValue;
		}
		return null;
	} catch (error) {
		console.log("test error params : ", error);
		return null;
	}
}

const setProfile = (data) => {
    try {
        localStorage.setItem("profile", JSON.stringify(data));;
        return true
    } catch (error) {
        return false
    }
}

const getProfile = () => {
	try {
		const data = localStorage.getItem("profile");
		return JSON.parse(data);
	} catch (error) {
		return null
	}
}

const setMenu = (data) => {
	localStorage.setItem("menus", data);
	return true;
}

const getMenu = () => {
	var menu = localStorage.getItem("menus")
	return menu;
}

export {
    getAuthorization,
    setAuthorization,
    removeAuthFromStorage,
	setProfile,
	getProfile,
	setSSOLogin,
	logoutPage,
	getMenu,
	setMenu
}