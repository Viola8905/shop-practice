import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
const LoadMore = () => {
	const state = useContext(GlobalState)
	const [page, setPage] = state.productsApi.page
	const [result] = state.productsApi.result;
	return (
		<div className='load_more'>
			{
					result < page*9 ? "" : <button onClick={() => setPage(page+1) }>Load More</button>
			}
		</div>
	)
}

export default LoadMore