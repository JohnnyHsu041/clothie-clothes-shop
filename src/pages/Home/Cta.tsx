import Button from "../../components/ui/Button";
import s from "../../styles/css/Cta.module.css";

const Cta: React.FC = () => {
    return (
        <section className={`container ${s.cta}`}>
            <div className={s["cta-container"]}>
                <h2 className={s["cta-title"]}>sign up for elegant life.</h2>
                <div className={s["cta-client"]}>
                    <div className={s["cta-img"]}></div>
                    <div className={s["cta-input"]}>
                        <form>
                            <div className={s.email}>
                                <label htmlFor="email">電子郵件</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder=""
                                />
                            </div>
                            <div className={s.password}>
                                <label htmlFor="password">密碼</label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder=""
                                />
                            </div>
                            <div className={s["password-again"]}>
                                <label htmlFor="password-again">
                                    再次輸入密碼
                                </label>
                                <input
                                    id="password-again"
                                    type="password"
                                    required
                                    placeholder=""
                                />
                            </div>
                            <Button type="submit">註冊</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
