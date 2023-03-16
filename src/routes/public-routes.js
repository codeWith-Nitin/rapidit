import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RemoteButton = React.lazy(() => import('mainapp/App'));

function PublicRoutes() {
	return (
		<Routes>
			<Route path="/" element={<RemoteButton />} />
			<Route path="*" element={<h1>Not found</h1>} />
		</Routes>
	);
}

export default PublicRoutes;
