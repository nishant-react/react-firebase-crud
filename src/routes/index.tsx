import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import PrivateRoutes from './protectedRoute';
import ProductDetailPage from '../pages/product/details/Details';

const Products = lazy(() => import('../pages/product/products/Products'));
const Login = lazy(() => import('../pages/auth/Login'));
const Create = lazy(() => import('../pages/product/create&update/Create'));
const Update = lazy(() => import('../pages/product/create&update/Update'));

const RouteProvider: React.FC = () => {
	const isLoggedIn: boolean = useAppSelector((state) => state.user.isLoggedIn);

	return (
		<>
			<Router>
				<Suspense>
					<Routes>
						<Route path='/' element={isLoggedIn ? <Navigate to="/products" /> : <Navigate to="/login" />} />
						<Route path='/login' element={<Login />} />

						<Route element={<PrivateRoutes />} >
							<Route path='/products' element={<Products />} />
							<Route path='/add-product' element={<Create />} />
							<Route path='/update/:id' element={<Update />} />
							<Route path='/details/:id' element={<ProductDetailPage />} />
						</Route>
					</Routes>
				</Suspense>
			</Router>
		</>
	);
};

export default RouteProvider;
