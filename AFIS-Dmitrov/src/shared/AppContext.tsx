import React, { useCallback, useState } from "react";

interface IAppContext {
	theme: string;
	toggleTheme: () => void;

}

const initialContext = {
	theme: 'dark',
	toggleTheme: () => { },

}

const AppContext = React.createContext<IAppContext>(initialContext);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	
	const [theme, setTheme] = useState<string>(
		() => {

			const theme = localStorage.getItem("theme") || "dark";

			document.documentElement.setAttribute("data-theme", theme);
			return theme}
	);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === "dark" ? "light" : "dark";

		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	}, [theme]);


	return (
		<AppContext.Provider value={{
			theme,
			toggleTheme,
		}}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	const context = React.useContext(AppContext);

	return context;
};

export default AppContextProvider;