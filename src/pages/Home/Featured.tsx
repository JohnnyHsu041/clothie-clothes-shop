import s from "../../styles/css/Featured.module.css";

const Featured: React.FC = () => {
    return (
        <section className={`container ${s.featured}`}>
            <h2 className={s["featured-title"]}>featured.</h2>
            <div className={s["featured-carousel"]}>
                <div>left arrow</div>
                <ul className={s["featured-carousel__products"]}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
                <div>right arrow</div>
            </div>
        </section>
    );
};

export default Featured;
