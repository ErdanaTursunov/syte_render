import React, { useRef } from 'react';
import withAuth from './WithAuth';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { $authHost } from '../http/axios';

const Contact = () => {
	const formRef = useRef();

	const sendFormToServer = async (e) => {
			e.preventDefault();
	
			const data = {
					name: document.querySelector('[name="name"]').value,
					email: document.querySelector('[name="email"]').value,
					number: document.querySelector('[name="number"]').value,
					msg: document.querySelector('[name="msg"]').value
			};
	
			try {
					const response = await $authHost.post('/contact', data);
	
					console.log("Успешно отправлено");
			} catch (error) {
					console.error(error);
					alert('Ошибка при отправке сообщения.');
			}
	};
	

    return (
        <div className='home'>
            <Header />
            <section className="contact">
                <div className="row">
                    <div className="image">
                        <img src="/images/contact-img.svg" alt="Контактное изображение" />
                    </div>
                    <form ref={formRef} onSubmit={sendFormToServer}>
                        <h3>По поводу платформы:</h3>
                        <input type="text" placeholder="Полное имя" name="name" required maxLength="50" className="box" />
                        <input type="email" placeholder="email" name="email" required maxLength="50" className="box" />
                        <input type="number" placeholder="Номер телефона" name="number" required maxLength="50" className="box" />
                        <textarea name="msg" className="box" placeholder="Ваше сообщение" required maxLength="1000" cols="30" rows="10"></textarea>
                        <input type="submit" value="Отправить" className="inline-btn" />
                    </form>
                </div>
                <div className="box-container">
                    <div className="box">
                        <h3>Социальные сети</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href='#'><FontAwesomeIcon style={{ fontSize: '30px', marginRight: '20px' }} icon={faInstagram} /></a>
                            <a href='#'><FontAwesomeIcon style={{ fontSize: '30px', marginRight: '20px' }} icon={faWhatsapp} /></a>
                            <a href='https://t.me/eskendiiir'><FontAwesomeIcon style={{ fontSize: '30px', marginRight: '20px' }} icon={faTelegram} /></a>
                        </div>
                    </div>
                    <div className="box">
                        <h3>Обратная связь</h3>
                        <a href="mailto:eskendirhasoiya@gmail.com">Тех. Поддержка</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default withAuth(Contact, ['user']);