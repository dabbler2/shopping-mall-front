import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const style = {
	width: 500,
	margin: '5px auto'
}

const categoryList = ['Food', 'Health', 'Household', 'Pet', 'Cosmetics', 'Office', 'Appliances', 'Furniture', 'Media', 'Others']
const statusList = ['Salable', 'Unsalable', 'Pending']

export default function ProductForm(props){
	const [name,setName] = useState(props.name||'')
	const [category,setCategory] = useState(props.category||9)
	const [status,setStatus] = useState(props.status||0)
	const [product_body,setBody] = useState(props.body||'')
	const [price,setPrice] = useState(props.price||1)
	const [sale_price,setSalePrice] = useState(props.sale_price)
	
	return (
		<Form style={style} onSubmit={e => props.onSubmit(e,{name,category,status,body:product_body,price,sale_price})}>
			<Form.Group>
				<Form.Label>이름</Form.Label>
				<Form.Control required onChange={e => setName(e.target.value)} defaultValue={props.name || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>카테고리</Form.Label>
				<Form.Select value={category} onChange={e => setCategory(+e.target.value)} aria-label="Default select example">
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
				<Form.Control as="textarea" onChange={e => setBody(e.target.value)} defaultValue={props.body || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>정가</Form.Label>
				<Form.Control required type='number' onChange={e => setPrice(+e.target.value)} defaultValue={props.price || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>판매가</Form.Label>
				<Form.Control type='number' onChange={e => setPrice(+e.target.value)} defaultValue={props.price || ''} />
			</Form.Group>
			<br />
			<Button type='submit' className='me-2'>{props.tag || '상품 등록'}</Button>
		</Form>
	)
}