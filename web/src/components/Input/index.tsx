import React, {InputHTMLAttributes} from 'react'; // InputHTMLAttributes fornece todos os atributos padrão que um elemento input pode receber
import './styles.css';

interface InputProps extends InputHTMLAttributes <HTMLInputElement> { // extendemos a interface InputProps a interface InputHTMLAttributes e definimos que queremos somente os atributos padrão do input
  name: string;
  label: string;
}

const Input: React.FunctionComponent <InputProps> = ({label, name, ...rest}) => {
  // fazemos uma desestruturação de props e pegamos label, name e repassamos os demais atributos padrão do input pelo rest operator
  return (
    <div className="input-block">
      {/* no react utilizamos htmlFor ao invés de for */}
      <label htmlFor={name}>{label}</label>
      <input type="text" className={name} {...rest}/>
    </div>
  );
}

export default Input;