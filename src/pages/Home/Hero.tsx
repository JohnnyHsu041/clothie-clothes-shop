import { Link } from 'react-router-dom';

import s from '../../styles/css/Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={`container ${s.hero}`}>
            <div className={s['hero-intro']}>
                <h1 className={s['hero-intro__title']}>
                    <p>
                        <span>2022</span> Spring/Summer
                    </p>
                </h1>
                <div className={s['hero-intro__content']}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean massa metus, aliquet non auctor vitae, ornare in
                        libero. Integer a ultrices dolor. Praesent aliquet quam
                        et felis pellentesque fermentum. Nulla quis odio non
                        velit lobortis rhoncus.
                    </p>
                </div>
                <div className={s['hero-intro__cta']}>
                    {/* should be Button Component later */}
                    <Link to="/newin">立即購買&rarr;</Link>
                </div>
            </div>
            <div className={s['hero-img']}></div>
        </section>
    );
};

export default Hero;
