import React, {SelectHTMLAttributes} from 'react'; // SelectHTMLAttributes fornece todos os atributos padrão que um elemento select pode receber
import './styles.css';

interface SelectProps extends SelectHTMLAttributes <HTMLSelectElement> { // extendemos a interface SelectProps a interface SelectHTMLAttributes e definimos que queremos somente os atributos padrão do select
  name: string;
  label: string;
  options: Array <{ // criamos a props options para o componente Select, ela recebe umobjeto com as propriedades value e label, ambas strings
    value: string; 
    label: string;
  }>
}

const Select: React.FunctionComponent <SelectProps> = ({label, name, options, ...rest}) => {
  // fazemos uma desestruturação de props e pegamos label, name, options e repassamos os demais atributos padrão do select pelo rest operator
  return (
    <div className="select-block">
      {/* no react utilizamos htmlFor ao invés de for */}
      <label htmlFor={name}>{label}</label>
      {/* dentro do elemento select fazemos um map que renderizará um elemento option para cada opção que recebemos como props */}
      <select value="" className={name} {...rest}>
        {/* definimos uma primeira opção cujo objetivo é estar disponível apenas para indicar as opções, ele estará desabilitada e oculta dentre as demais opções por padrão */}
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })} 
      </select>
    </div>
  );
}

export default Select;