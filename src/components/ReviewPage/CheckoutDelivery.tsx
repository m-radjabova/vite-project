import { useForm } from "react-hook-form";
import { FaStore } from "react-icons/fa";
import { IoMdCar, IoMdPin, IoMdTime } from "react-icons/io";

interface Props {
  register: ReturnType<typeof useForm>['register'];
    errors: ReturnType<typeof useForm>['formState']['errors'];
  deliveryMethod: string;
}
function CheckoutDelivery( { register, errors, deliveryMethod }: Props ) {
  return (
    <div>
        <div className="form-section">
            <h3 className="section-title">
                <IoMdCar className="section-icon" />
                Способ доставки
            </h3>
        
            <div className="radio-group">
                <label className={`radio-option ${deliveryMethod === 'courier' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="courier"
                        {...register("delivery")}
                        className="radio-input"
                    />
                    <div className="radio-content">
                        <IoMdCar className="radio-icon" />
                        <div>
                            <h4>Курьерская доставка</h4>
                            <p>Доставка по указанному адресу (1-2 дня)</p>
                        </div>
                        <span className="radio-price">Бесплатно</span>
                    </div>
                    <span className="radio-check"></span>
                </label>
        
                <label className={`radio-option ${deliveryMethod === 'pickup' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="pickup"
                        {...register("delivery")}
                        className="radio-input"
                    />
                    <div className="radio-content">
                        <FaStore className="radio-icon" />
                        <div>
                            <h4>Самовывоз</h4>
                            <p>Заберите заказ из нашего магазина</p>
                        </div>
                        <span className="radio-price">Бесплатно</span>
                    </div>
                    <span className="radio-check"></span>
                </label>
        
                <label className={`radio-option ${deliveryMethod === 'express' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="express"
                        {...register("delivery")}
                        className="radio-input"
                                />
                    <div className="radio-content">
                        <IoMdTime className="radio-icon" />
                        <div>
                            <h4>Экспресс доставка</h4>
                            <p>Доставка в течение 2-4 часов</p>
                        </div>
                        <span className="radio-price">+15.00 $</span>
                    </div>
                    <span className="radio-check"></span>
                </label>
            </div>
        
            {deliveryMethod !== 'pickup' && (
                <div className={`form-group ${errors.address ? 'error' : ''}`}>
                    <input 
                        type="text" 
                        id="address"
                        {...register("address", { 
                        required: deliveryMethod !== 'pickup' ? "Обязательное поле" : false
                        })}
                        placeholder=" "
                    />
                    <label htmlFor="address">
                        <IoMdPin className="input-icon" />
                        Адрес доставки
                    </label>
                    {errors.address && <span className="error-message">{errors.address.message as string}</span>}
                </div>
            )}
        </div>
    </div>
  )
}

export default CheckoutDelivery