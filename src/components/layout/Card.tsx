import s from "../../styles/css/Card.module.css";

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
    return <div className={s.card}>{props.children}</div>;
};

export default Card;
