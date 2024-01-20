import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductMain from './components/product/product-main'
import SearchMain from
'./components/search/search-main'
import ProductDetail from './components/product/product-detail'

const router = createBrowserRouter([
	{ path: '', element: <p>Hello world</p> },
	{ path: 'product', element: <ProductMain /> },
	{ path: 'productDetail', element: <ProductDetail /> },
	{ path: 'search', element: <SearchMain /> }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
