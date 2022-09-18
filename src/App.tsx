import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewIn from './pages/NewIn';
import Clothing from './pages/Clothing';
import Accessories from './pages/Accessories';
import Cart from './pages/Cart';
import User from './pages/User';
import Auth from './pages/Auth';
import MainHeader from './components/header/MainHeader';
import WarningBar from './components/ui/WarningBar';

function App() {
    return (
        <>
            {/* <WarningBar /> */}
            <MainHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/newin" element={<NewIn />} />
                    <Route path="/clothing" element={<Clothing />} />
                    <Route path="/accs" element={<Accessories />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
