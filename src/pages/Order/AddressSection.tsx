import { useSelector } from "react-redux";
import Input from "../../components/form/Input";
import { RootState } from "../../redux/store";
import s from "../../styles/css/AddressSection.module.css";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MIN_LENGTH,
} from "../../utils/validator";

const AddressSection: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <div className={s.buyer}>
            <h3>個人資料</h3>
            <div className={s.info}>
                <div className={s.name}>
                    <Input
                        id="name"
                        type="text"
                        title="姓名"
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={() => {}}
                        errorText="必填"
                    />
                    <div className={s.title}>
                        <label htmlFor="title">稱謂</label>
                        <select id="title">
                            <option>小姐</option>
                            <option>先生</option>
                        </select>
                    </div>
                </div>
                <div className={s.contact}>
                    <Input
                        readonly
                        id="email"
                        type="email"
                        title="電子郵件"
                        initValue="clothy@clothie.com"
                        validators={[VALIDATOR_EMAIL()]}
                        onChange={() => {}}
                    />
                    <Input
                        id="tel"
                        type="tel"
                        title="手機號碼"
                        validators={[VALIDATOR_MIN_LENGTH(10)]}
                        onChange={() => {}}
                        errorText="必填"
                    />
                </div>
                <div className={s.address}>
                    <div className={s.county}>
                        <label htmlFor="county">縣市</label>
                        <select id="county">
                            <option>台北市</option>
                            <option>新北市</option>
                            <option>桃園市</option>
                            <option>台中市</option>
                            <option>台南市</option>
                            <option>高雄市</option>
                            <option>新竹縣</option>
                            <option>苗栗縣</option>
                            <option>彰化縣</option>
                            <option>南投縣</option>
                            <option>雲林縣</option>
                            <option>嘉義縣</option>
                            <option>屏東縣</option>
                            <option>宜蘭縣</option>
                            <option>花蓮縣</option>
                            <option>台東縣</option>
                            <option>基隆市</option>
                            <option>新竹市</option>
                            <option>嘉義市</option>
                        </select>
                    </div>
                    <Input
                        id="address"
                        type="text"
                        title="地址"
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={() => {}}
                        errorText="必填"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressSection;
