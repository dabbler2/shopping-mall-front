import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const style = {
	width: 500,
	margin: '5px auto'
}

const categoryList = ['Food', 'Health', 'Household', 'Pet', 'Cosmetics', 'Office', 'Appliances', 'Furniture', 'Media', 'Others']
const statusList = ['Salable', 'Unsalable', 'Pending']

export default function ProductForm(props){
	const [name,setName] = useState('')
	const [category,setCategory] = useState(9)
	const [status,setStatus] = useState(0)
	const [product_body,setBody] = useState('')
	const [price,setPrice] = useState(1)
	const [sale_price,setSalePrice] = useState(1)
	
	useEffect(() => {
	    setName(props.product.name || '')
	    setCategory(props.product.category || 9)
	    setStatus(props.product.status || 0)
	    setBody(props.product.body || '')
	    setPrice(props.product.price || 1)
	    setSalePrice(props.product.sale_price || 1)
	}, [props.product])
	
	return (
		<Form style={style} onSubmit={e => props.onSubmit(e,{name,category,status,body:product_body,price,sale_price})}>
			<Form.Group>
				<Form.Label>이름</Form.Label>
				<Form.Control required onChange={e => setName(e.target.value)} defaultValue={props.product.name || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>카테고리</Form.Label>
				<Form.Select onChange={e => setCategory(+e.target.value)} defaultValue={props.product.category || 0}>
					{categoryList.map((category_,i) => <option key={i} value={i}>{category_}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>판매 상태</Form.Label>
				<Form.Select value={status} onChange={e => setStatus(+e.target.value)} aria-label="Default select example">
					{statusList.map((status_,i) => <option key={i} value={i}>{status_}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>설명</Form.Label>
				<Form.Control as="textarea" onChange={e => setBody(e.target.value)} defaultValue={props.product.body || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>정가</Form.Label>
				<Form.Control required type='number' onChange={e => setPrice(+e.target.value)} defaultValue={props.product.price || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>판매가</Form.Label>
				<Form.Control type='number' onChange={e => setSalePrice(+e.target.value)} defaultValue={props.product.sale_price || ''} />
			</Form.Group>
			<br />
			<Button type='submit' className='me-2'>{props.tag || '상품 등록'}</Button>
			{props.tag && (<Button onClick={props.softDeleteProduct} className='me-2'>상품 삭제</Button>)}
		</Form>
	)
}