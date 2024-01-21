import React, {useState,useEffect} from 'react'
import ProductForm from './product-form'
import {server} from '../../constant.js'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/button'

const style = {
	width: 700,
	margin: '10px auto'
}

export default function ProductUpdate(props){
	const [product,setProduct] = useState({})
	const [images,setImages] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const id = +searchParams.get('id')
	if(isNaN(id) || !Number.isInteger(id) || id<1){
		alert('해당 상품이 존재하지 않습니다.')
		navigate('/')
	}
	// 인증 추가
	const [Authorization,setAuthorization] = useState('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1NzYyOTkxLCJleHAiOjE3MDU3NjMxMTF9.0q5KuDZSPh2TAn5-ofLTZDNFrX5eSTuC8HzwyEvvFfw')
	const [refreshtoken,setRefreshtoken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDU3NjI5OTEsImV4cCI6MTcwNjM2Nzc5MX0.8GaubrgbLn1wUHoQrLLyWlGd7FqETkZnz6_7-QpwTBE')
	
	const getProduct = async () => {
		const res = await fetch(server+`/product/${id}`)
		if(res.status!==200){
			alert('해당 상품이 존재하지 않습니다.')
			navigate('/')
		}
		const product_ = await res.json()
		setProduct(product_)
	}
	
	const getImages = async () => {
		const res = await fetch(server+`/product/${id}/image`)
		if(res.status!=200) return
		const images_ = await res.json()
		setImages(images_)
	}
	
	useEffect(() => {
		getProduct()
		getImages()
	},[])
	
	const updateProduct = async (e,body) => {
		e.preventDefault()
		const {thumbnail, ...body_} = body
		const res = await fetch(server+`/product/${id}`, {method:'PATCH',
		headers:{'Content-Type':'application/json', Authorization, refreshtoken},
		body: JSON.stringify(body_)})
		if(res.status!==200) return alert('오류가 발생했습니다. 다시 시도해주세요.')
		if(body.thumbnail){
			const formData = new FormData()
			formData.append('image', thumbnail)
			const res_thumbnail = await fetch(server+`/product/${id}/thumbnail`, {method:'PATCH',
			headers:{Authorization, refreshtoken},
			body: formData})
		}
		alert('상품 수정이 완료되었습니다.')
		navigate('/')
	}
	
	const softDeleteProduct = async (e) => {
		e.preventDefault()
		const res = await fetch(server+`/product/${id}`, {method:'delete',
		headers:{'Content-Type':'application/json', Authorization, refreshtoken}})
		if(res.status===200){
			alert('상품 삭제가 완료되었습니다.')
			navigate('/')
		}
		return alert('오류가 발생했습니다. 다시 시도해주세요.')
	}
	
	return (
		<div style={style}>
			<ProductForm onSubmit={updateProduct} softDeleteProduct={softDeleteProduct} product={product} tag='상품 수정' />
		</div>
	)
}