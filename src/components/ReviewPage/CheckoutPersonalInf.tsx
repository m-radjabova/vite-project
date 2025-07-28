import { useForm } from "react-hook-form";
import { IoMdMail, IoMdPerson, IoMdPhonePortrait } from "react-icons/io";

interface Props{
    register: ReturnType<typeof useForm>['register'];
    errors: ReturnType<typeof useForm>['formState']['errors'];
}

function CheckoutPersonalInf({ register, errors }: Props) {
  return (
    <div>
        <div className="form-section">
            <h3 className="section-title">
                <IoMdPerson className="section-icon" />
                Личная информация
            </h3>
                        
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <input 
                    type="text" 
                    id="name"
                    {...register("name", { required: "Обязательное поле" })}
                    placeholder=" "
                    className={errors.name ? 'error-input' : ''}
                />
                <label htmlFor="name">Имя</label>
                {errors.name && <span className="error-message">{errors.name.message as string}</span>}
            </div>
        
            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                <input 
                    type="tel" 
                    id="phone"
                    {...register("phone", { 
                        required: "Обязательное поле"
                    })}
                    placeholder=" "
                />
                <label htmlFor="phone">
                    <IoMdPhonePortrait className="input-icon" />
                    Телефон
                </label>
                {errors.phone && <span className="error-message">{errors.phone.message as string}</span>}
            </div>
        
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <input 
                    type="email" 
                    id="email"
                    {...register("email", { 
                        required: "Обязательное поле",
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Введите корректный email"
                        }
                    })}
                    placeholder=" "
                />
                <label htmlFor="email">
                    <IoMdMail className="input-icon" />
                    Email
                </label>
                {errors.email && <span className="error-message">{errors.email.message as string}</span>}
            </div>
        </div>
    </div>
  )
}

export default CheckoutPersonalInf