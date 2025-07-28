import { useForm } from "react-hook-form";
import { IoMdCard, IoMdCash, IoMdGlobe } from "react-icons/io";

interface Props {
    register: ReturnType<typeof useForm>['register'];
    errors: ReturnType<typeof useForm>['formState']['errors'];
    paymentMethod: string;
}
function CheckoutPayment( { register, paymentMethod }: Props ) {
  return (
    <div>
        <div className="form-section">
            <h3 className="section-title">
                <IoMdCard className="section-icon" />
                Способ оплаты
            </h3>
        
            <div className="radio-group">
                <label className={`radio-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="cash"
                        {...register("payment")}
                        className="radio-input"
                    />
                    <div className="radio-content">
                        <IoMdCash className="radio-icon" />
                        <div>
                            <h4>Наличными</h4>
                            <p>Оплата при получении</p>
                        </div>
                    </div>
                    <span className="radio-check"></span>
                </label>
        
                <label className={`radio-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="card"
                        {...register("payment")}
                        className="radio-input"
                    />
                    <div className="radio-content">
                        <IoMdCard className="radio-icon" />
                        <div>
                            <h4>Картой онлайн</h4>
                            <p>Оплата картой через платежный шлюз</p>
                        </div>
                    </div>
                    <span className="radio-check"></span>
                </label>
        
                <label className={`radio-option ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                    <input 
                        type="radio" 
                        value="transfer"
                        {...register("payment")}
                        className="radio-input"
                    />
                    <div className="radio-content">
                        <IoMdGlobe className="radio-icon" />
                        <div>
                            <h4>Банковский перевод</h4>
                            <p>Оплата по реквизитам</p>
                        </div>
                                </div>
                    <span className="radio-check"></span>
                </label>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPayment