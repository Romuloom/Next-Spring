import {InputHTMLAttributes} from "react";
import {formatReal} from "app/util/money"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    columnClasses: String,
    currency?: boolean,
    error?: String,
    id: string,
    label: string;
    onChange?: (value: any) => void;

}


export const Input: React.FC<InputProps> = ({ columnClasses, label, id, currency, onChange, error, ...inputProps}: InputProps) => {

    // @ts-ignore
    const onInputChange = (event) => {
        {
            let value = event.target.value

            if (value && currency) {
                value = formatReal(value);
            }

            if (onChange) {
                onChange(value)
            }
        }
    }



    return (
        <div className={`field column ${columnClasses}`}>
            <label className='label' htmlFor={id}>{label}</label>
            <div className='control'>
                <input
                    {...inputProps}
                    className='input'
                    id={id}
                    onChange={onInputChange}/>
                {error && <p className="help is-danger">{error}</p>}
            </div>
        </div>
    )
}