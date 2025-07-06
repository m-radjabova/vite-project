import { useForm } from "react-hook-form";

function ContactPage() {
  const {register, handleSubmit, reset, formState: { isSubmitting }} = useForm();

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-title">
          <h1>Контакты</h1>
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
            <button type="submit" disabled={isSubmitting}>отправить</button>
          </form>
        </div>
      </div>
      <div className="map">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3AYOUR_MAP_ID&amp;source=constructor"
                width="100%"
                height="500"
                frameBorder="0"
                title="Yandex Map"
                style={{ border: 0 }}
                allowFullScreen
            ></iframe>
        </div>
    </div>
  );
}

export default ContactPage;