import React from 'react';

import s from '../styles/css/WarningBar.module.css';

const WarningBar: React.FC = () => {
    return (
        <div className={s.warning}>本網站無商業用途，請勿輸入真實帳號密碼</div>
    );
};

export default WarningBar;
