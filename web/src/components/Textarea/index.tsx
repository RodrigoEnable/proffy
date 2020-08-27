import React, {TextareaHTMLAttributes} from 'react'; // TextareaHTMLAttributes fornece todos os atributos padrão que um elemento textarea pode receber
import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes <HTMLTextAreaElement> { // extendemos a interface TextareaProps a interface TextareaHTMLAttributes e definimos que queremos somente os atributos padrão do textarea
  name: string;
  label: string;
}

const Textarea: React.FunctionComponent <TextareaProps> = ({label, name, ...rest}) => {
  // fazemos uma desestruturação de props e pegamos label, name e repassamos os demais atributos padrão do textarea pelo rest operator
  return (
    <div className="textarea-block">
      {/* no react utilizamos htmlFor ao invés de for */}
      <label htmlFor={name}>{label}</label>
      <textarea className={name} {...rest}/>
    </div>
  );
}

export default Textarea;