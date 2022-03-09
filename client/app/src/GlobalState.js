import axios from 'axios'
import React ,{createContext, useEffect, useState} from 'react'
import ProductsApi from './api/ProductsApi'
import UserApi from './api/UserApi'

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
	const [token, setToken] = useState(false)
	

	useEffect(() => {
		 const firstLogin = localStorage.getItem("firstLogin");
     if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/user/refresh_token");

        setToken(res.data.accesstoken);
				
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
		 }
	},[])
 
	const state = {
    token: [token, setToken],
    productsApi: ProductsApi(),
		userApi: UserApi(token),
		 
  };
	return (
		<GlobalState.Provider value={state}>
			{children}
		</GlobalState.Provider>
	)
}