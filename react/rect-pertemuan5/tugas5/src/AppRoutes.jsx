import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comment from '../pages/Comment';
import Home from '../pages/Home';
import Times from '../pages/Time';
// import MainLayout from '../layouts/MainLayout';
import SearchPhotoGallery from './search';

const AppRoutes = () => (
    <Router>
        <MainLayout>
            <Routes>
                
                <Route path="/time" element={<Times />} />
                <Route path='/search' element={<SearchPhotoGallery />} />
            </Routes>
        </MainLayout>
    </Router>
);

export default AppRoutes;