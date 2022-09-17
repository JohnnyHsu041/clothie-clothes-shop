import NavBar from './nav/NavBar';

import s from '../assets/styles/css/MainHeader.module.css';

const MainHeader: React.FC = () => {
    return (
        <header className={s['header']}>
            <NavBar />
        </header>
    );
};

export default MainHeader;
