import Button from "../../components/ui/Button";
import s from "../../styles/css/Hero.module.css";

const Hero: React.FC = () => {
    return (
        <section className={`container ${s.hero}`}>
            <div className={s["hero-intro"]}>
                <h1 className={s["hero-intro__title"]}>
                    <p>
                        <span>2022</span> Spring/ Summer
                    </p>
                </h1>
                <Button type="link" dest="/new-in">
                    立即選購
                </Button>
            </div>
            <div className={s["hero-img"]}>
                <img
                    src="/images/hero.jpeg"
                    alt="2022 spring/summer clothing"
                />
            </div>
        </section>
    );
};

export default Hero;
