import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Auth = React.lazy(() => import('auth/App'));

function PrivateRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="*" element={<h1>Not found</h1>} />
		</Routes>
	);
}

export default PrivateRoutes;
