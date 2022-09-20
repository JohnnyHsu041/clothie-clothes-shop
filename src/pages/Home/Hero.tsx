import { Link } from "react-router-dom";

import heroImage from "../../assets/images/hero.jpeg";
import Button from "../../components/ui/Button";
import s from "../../styles/css/Hero.module.css";

const Hero: React.FC = () => {
    return (
        <section className={`container ${s.hero}`}>
            <div className={s["hero-intro"]}>
                <h1 className={s["hero-intro__title"]}>
                    <p>
                        <span>2022</span> Spring/Summer
                    </p>
                </h1>
                <div className={s["hero-intro__content"]}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean massa metus, aliquet non auctor vitae, ornare in
                        libero. Integer a ultrices dolor. Praesent aliquet quam
                        et felis pellentesque fermentum. Nulla quis odio non
                        velit lobortis rhoncus.
                    </p>
                </div>
                <div className={s["hero-intro__cta"]}>
                    <Button type="link" dest="/newin">
                        立即購買&rarr;
                    </Button>
                </div>
            </div>
            <div className={s["hero-img"]}>
                <img src={heroImage} alt="2022 spring/summer clothing" />
            </div>
        </section>
    );
};

export default Hero;
