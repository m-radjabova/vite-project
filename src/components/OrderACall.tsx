import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function OrderACall() {
    const {register, handleSubmit, reset, formState: { isSubmitting }} = useForm();
    const navigate = useNavigate();

  return (
    <div className="callback ">
        <div className="container mb-3">
          <div className="close d-flex justify-content-end">
            <IoMdClose onClick={() => navigate(-1)}  className="close-icon" />
          </div>
            <div className="contact-title">
              <h1>Заказ звонка</h1>
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit((data) => { console.log(data); reset(); })}>
                  <div className="contact-form-row">
                  <input type="text" placeholder="Ваше имя*" {...register("name", { required: true })} />
                  <input type="email" placeholder="Email*" {...register("email", { required: true })} />
                  </div>
                  <div className="contact-form-row">
                  <input type="tel" placeholder="Телефон*" {...register("phone", { required: true })} />
                  <input type="text" placeholder="Компания" {...register("company")} />
                  </div>
                  <textarea placeholder="Сообщение*" {...register("message", { required: true })} />
                  <button onClick={() => navigate("/order-a-call/completed")} type="submit" disabled={isSubmitting}>отправить</button>
              </form>
            </div>
      </div>
    </div>
  )
}

export default OrderACall