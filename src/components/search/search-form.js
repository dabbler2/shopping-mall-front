import React, {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SearchForm(props){
	const [key,setKey] = useState('')
	return (
		<div style={{textAlign:'center'}}>
			<Form onSubmit={e => props.search(e,key)}>
				<Form.Control required placeholder='검색어를 입력해주세요.' onChange={e => setKey(e.target.value)} />
				<Button type='submit'>검색</Button>
			</Form>
		</div>
	)
}