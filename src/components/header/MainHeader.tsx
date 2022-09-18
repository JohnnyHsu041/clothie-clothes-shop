import NavBar from './NavBar';

import s from '../../styles/css/MainHeader.module.css';

const MainHeader: React.FC = () => {
    return (
        <header className={s['header']}>
            <NavBar />
        </header>
    );
};

export default MainHeader;
