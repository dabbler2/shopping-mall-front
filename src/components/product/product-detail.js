import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {server} from '../../constant.js'
import Card from 'react-bootstrap/Card'

const style = {
	margin: '10px auto',
	padding: '10px',
	width: 600
}

const imgStyle = {
	borderRadius: 15,
	objectFit: 'cover',
	width: 300,
	height: 225,
	marginRight: 20
}

const decimal1 = (total,count) => {
	if(!count) return '0.0'
	const rating = total*10/count|0
	return `{rating/10|0}.{rating%10}`
}

export default function ProductCard(props){
	const [product,setProduct] = useState({})
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const id = +searchParams.get('id')
	console.log(id)
	if(isNaN(id) || !Number.isInteger(id) || id<1){
		alert('해당 상품이 존재하지 않습니다.')
		navigate('/')
	}
	
	const getProduct = async () => {
		const res = await fetch(server+`/product/${id}`)
		if(res.status!==200){
			alert('해당 상품이 존재하지 않습니다.')
			navigate('/')
		}
		const product_ = await res.json()
		setProduct(product_)
		console.log(product_)
	}
	
	useEffect(() => {
		getProduct()
	},[])
	
	// 디테일 깔기
	return (
		<Card style={style}>
			<Card.Header style={{display:'flex'}}>
				<img style={imgStyle} src={product.thumbnail || './tree.jpg'} />
				<div>
					<h1>{product.name}</h1>
					<h3>{product.price}원</h3>
					<h3>{product.sale_price}원</h3>
					<p>{decimal1(product.rating_total,product.rating_count)} ({product.rating_count}) 판매량: {product.sales_volume}</p>
				</div>
			</Card.Header>
		</Card>
	)
}