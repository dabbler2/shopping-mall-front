import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchForm from './search-form'
import SearchCard from './search-card'
import {server} from '../../constant.js'

export default function SearchMain(props){
	const [products,setProducts] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	//if(!key)
	const search = async (e,key) => {
		e.preventDefault()
		const res = await fetch(server+'/product')
		const products_ = await res.json()
		setProducts(products_)
		navigate(`?key=${key}`)
	}	
	
	return (
		<div>
			<SearchForm search={search} />
			<div>
				{products.map(product => <SearchCard key={product.id} product={product} />)}
			</div>
		</div>
	)
}