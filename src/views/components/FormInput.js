import '../style/style.css';
import './components.css'

const FormInput = ({ type, name, label, placeholder, onChange }) => {

    return (
        <div>
            <label>
                {label}
                <input onChange={(e) => onChange(e)} type={type} name={name} placeholder={placeholder}></input>
            </label>
        </div>
    );
};

export default FormInput;
