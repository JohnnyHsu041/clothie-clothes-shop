import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.png";
import s from "../../styles/css/Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={s.footer}>
            <div className={s["footer-container"]}>
                <div className={s["logo-nav"]}>
                    <div className={s.logo}>clothie</div>
                    <nav>
                        <ul className={s["social-links"]}>
                            <li className={s.github}>
                                <a
                                    href="https://github.com/JohnnyHsu041"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <img src={githubIcon} alt="github icon" />
                                </a>
                            </li>
                            <li className={s.phone}>0920-759-188</li>
                            <li className={s.email}>a209328641@gmail.com</li>
                        </ul>
                    </nav>
                </div>
                <div className={s["footer-nav"]}>
                    <nav>
                        <p>Clothing</p>
                        <ul className={s["clothing"]}>
                            <li>
                                <Link to="/newin">最新商品</Link>
                            </li>
                            <li>
                                <Link to="/clothing">所有服飾</Link>
                            </li>
                            <li>
                                <Link to="/accs">鞋子飾品</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <p>Account</p>
                        <ul className={s["account"]}>
                            <li>
                                <Link to="/user">會員首頁</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <p className={s.copyright}>
                Copyright &copy; 2027 by clothie, Inc. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
