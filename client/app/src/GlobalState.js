import React ,{createContext, useState} from 'react'
import ProductsApi from './api/ProductsApi'

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
	const [token, setToken] = useState(false)
	

	const state = {
    token: [token, setToken],
    productsApi: ProductsApi(),
  };
	return (
		<GlobalState.Provider value={state}>
			{children}
		</GlobalState.Provider>
	)
}