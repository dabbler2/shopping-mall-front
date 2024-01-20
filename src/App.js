import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductCreate from './components/product/product-create'
import SearchMain from
'./components/search/search-main'
import ProductDetail from './components/product/product-detail'

const router = createBrowserRouter([
	{ path: '', element: <p>Hello world</p> },
	{ path: 'product', children: [
		{ path: 'create', element: <ProductCreate />}
	]},
	{ path: 'productDetail', element: <ProductDetail /> },
	{ path: 'search', element: <SearchMain /> }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
