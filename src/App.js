import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import './css/App.css'
import html2canvas from 'html2canvas';

import { Panel, Alert, Title, Headline, View, ScreenSpinner, Button, Snackbar, platform, ANDROID  } from '@vkontakte/vkui';

import Icon16Chevron from './img/chevron_16.png';
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';

import cookieIcon from './img/cookie.png';
import paper from './img/paper2.jpg';
import bg from './img/bg.jpg';
import sugar from './img/sugar.png';

import e1 from './img/e1.png';
import e2 from './img/e2.png';
import e3 from './img/e3.png';
import e4 from './img/e4.png';
import e5 from './img/e5.png';
import e6 from './img/e6.png';
import e7 from './img/e7.png';
import e8 from './img/e8.png';
import e9 from './img/e9.png';
import e10 from './img/e10.png';
import e11 from './img/e11.png';

import Lottie from 'react-lottie'
import animDataCookie from './animations/cookie.json'

import eruda from 'eruda';

const random = require('random');

const os = platform();

let app_id = 7557573,
	group_id = 197650766,
	need_balance = true;

let prefix = '___________';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			popout: null,
			activePanel: 'main',
			scheme: 'bright_light',

			can_generate: true,
			first_loaded: false,
			cookieAnimStarted: true,

			data: {},

			three: null,

			phrases: [
				'В жизни важно лишь одно..\nА остальное не важно',
				'Печенька не может предсказать твою судьбу, сделай ее сам',
				'Гони тех кто пёрнул однажды... Кто пёрнул раз. Пёрнет и дважды!',
				'Какой бы курицей не была девушка, запомни..\nГлавное не стать питухом',
				'Умные мысли всегда преследуют тебя! Но ты быстрее!',
				'Чтобы открыть любую дверь в своей жизни.. нужно запомнить 2 фразы! "На себя" и "от себя"',
				'Безумно можно быть пееервым',
				'Ой, ты такой милый и красивый! Улыбнись!',
				'Отложи свой телефон на час, посмотри в окно и улыбнись',
				'Ты давно не общался с бабушкой или дедушкой, позвони им',
				'Слушай свое сердце, пока оно не остановилось',
				'Я очень устала, знаешь как сложно придумывать пожелания?',
				'Если тебя незаслуженно обидели, вернись и заслужи',
				'Неумение врать ещё не повод говорить правду',
				'Не каждый может смотреть в завтрашний день, вернее не только лишь все',
				'Что ты хочешь услышать? Я Печенька, а не философ.',
				'Если жизнь ведет вас по самым сложным тропам - это дорога к удаче.',
				'Уделите особое внимание старой дружбе',
				'Слушайте каждого. Идеи приходят отовсюду.',
				'Ты сногшибаем, как банановая кожура',
				'Надо подкачаться, надо-надо подкачаться',
				'У тебя скоро день рождения или уже был, или не скоро будет. С праздником',
				'Сегодня ты получишь подарок',
				'Иди уже в туалет, хватит терпеть',
				'Думай о том, о чем не думаю даже те кто думает, что думает',
				'Встань и иди туда, где ты нужен',
				'Иди погуляй с собакой, не мучай животное',
				'Слово не воробей, ничто не воробей кроме воробья',
				'Сегодня именно тот день, когда надо подстричься',
				'О-оу-и-я-и-ё! БАТАРЕЙКА....',
				'Проживи этот день как игру',
				'Главное - не забыть главное. А то забудешь главное, а это главное!',
				'Не ссы в трусы, все будет Ok',
				'Просто будь счастлив, черт побери, ты этого заслуживаешь',
				'Не стоит идти против ветра, ведь он наркоман и он дует',
				'Не забудь поднять крышку унитаза',
				'Не делай поспешных выводов, делай вывошные допсеши',
				'Не жди у моря погоды, не оно ее делает',
				'Будь как последняя спичка - очень важным',
				'Если тебя никто не понимает, возможно ты китаец',
				'Не стой там где стоят все, стой там где никто не стоит',
				'Я знаю, ты все можешь\nP.S. Твоя Печенька',
				'Ты утопил мою сестру в чае, ублюдок',
				'Xiaomi - топ за свои деньги',
				'Сегодня ты должен поесть дошика',
				'В любой непонятной ситуации ешь дошик',
				'Этот день сулит немного интима, иди помойся',
				'Твоя сексуальность не знает границ, остановись, умоляю',
				'Не стой на светофоре, кто он такой, что бы указывать тебе',
				'Не бойся перемен, пусть перемены боятся тебя',
				'Не стоит мерить все линейкой, возьми рулетку',
				'Не будь п******, выключи свою колонку, когда идёшь по улице',
				'Жизнь бьёт тебя каждый раз, когда ты встаёшь? Ползи.',
				'Будь Колобком. Катись и радуйся жизни.',
				'Не бойся делать ошибки, без них не будет верных решений.',
				'Жить — это не значит дышать, это значит действовать. Сделай сегодня то, что давно боялся.',
				'Если гора не идёт к Магомеду, то это нормально, ведь она гора.',
				'Ты увидишь ответ на свой вопрос на дне 10-й выпитой тобой рюмки водки.',
				'Делай что можешь, с тем что имеешь, там где ты есть.',
				'Ваш питомец планирует сожрать вас.',
				'Не ходите вокруг да около, идите напролом.',
				'Если вы не сказали слова, которые стоило бы сказать, у вас слово не воробей.',
				'Завтрашним утром поверните налево, как только выйдете из дома.',
				'Делай сегодня то, чего не сделал вчера, ведь сделай ты это сегодня, завтра не надо будет делать.',
				'Делай это сейчас! Ведь сегодня завтра будет вчера.',
				'Если Вы хотите иметь то, что никогда не имели, — начните сегодня делать то, что никогда не делали',
				'Ты уникален, так же, как и все остальные.',
				'Нет безвыходных ситуаций: даже если вас съели, у вас, по крайней мере, есть два выхода.',
				'В ближайшее время ты подкачаешься!\nОтожмись 5 раз и прочти это еще раз...'
			]
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.go = this.go.bind(this);
		this.shareStory = this.shareStory.bind(this);
	}

	async componentDidMount () {
		bridge.subscribe(async ({ detail: { type, data }}) => {
			if(type !== undefined) console.log(type, data);
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = false ? data.scheme ? data.scheme : 'bright_light' : 'bright_light';
				document.body.attributes.setNamedItem(schemeAttribute);
				this.setState({ scheme: schemeAttribute.value });
				if(bridge.supports('VKWebAppSetViewSettings')){
					bridge.send('VKWebAppSetViewSettings', {status_bar_style: 'light', action_bar_color: 'none'});
				}
			}else if (type === 'VKWebAppViewRestore') {
				this.setState({ popout: null, screen: false });
				let shapes = document.getElementsByClassName('bg_shape_container');
				for(let element of shapes){
					try{
						console.log('delete', element);
						element.remove();
					}catch (e) {
						console.error(e);
					}
				}
			}
		});

		let user = await bridge.sendPromise('VKWebAppGetUserInfo');
		this.setState({ photo: user.photo_max_orig, name: user.first_name + ' ' + user.last_name });

		this.initializeTimer();

		await this.updateStorage();

		await bridge.send('VKWebAppInit');
	}

	async updateStorage () {
		let keys1 = [ 'used1', 'used2', 'used3' ],
			keys2 = [ 'balance', 'share_story', 'allow_msg', 'share_wall', /*'sub_group',*/ 'allow_noty', 'got_free' ];
		let sValues = await bridge.sendPromise('VKWebAppStorageGet', { keys: need_balance ? (keys2.join(prefix+',') + prefix).split(',') : (keys1.join(prefix+',') + prefix).split(',') });
		sValues = sValues.keys;
		let data = {};
		try{
			for(let value of sValues){
				let nmbr = Number(value.value);
				data[value.key] = (value.value == 'true' || value.value == 'false' || value.value == '') ? value.value == 'true' : nmbr > 0 ? nmbr : value.value;
			}
		}catch (e) {
			console.error('e3', e)
		}
		this.setState({ data, sValues });

		console.log(data);

		if(data['got_free' + prefix] === false || Date.now() - data['got_free' + prefix] >= 2 * 60 * 60 * 1000 ){
			await bridge.sendPromise('VKWebAppStorageSet', {key: 'got_free' + prefix, value: Date.now().toString()});
			await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: data['got_free' + prefix] === false ? '1' : (data['balance' + prefix] + 1).toString()});
			await this.updateStorage();
		}

		return;
	}

	go(panel) {
		this.setState({activePanel: panel});
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	initializeTimer() {
		let imgs = [
			e1,
			e2,
			e3,
			e4,
			e5,
			e6,
			e7,
			e8,
			e9,
			e10,
			e11
		];
		setInterval(()=>{
			try{
				if(this.state.screen) return;
				let shape_container = document.createElement('div');
				shape_container.className = 'bg_shape_container';
				let shape = document.createElement('img');
				shape.crossOrigin = 'anonymous';
				shape.className = 'bg_shape light_outline';
				shape.src = imgs[this.random(0, imgs.length)];
				shape.style.left = (this.random(-15, 90)) + 'vw';
				shape.style.height = '10vh';
				shape.style.width = '10vh';
				shape_container.appendChild(shape);
				document.getElementById('bg_shapes').appendChild(shape_container);
				for(let i = 0; i < 5; i++){
					shape.style.setProperty('--offset-x-' + i, this.random(-20, 20) +'vw');
				}
				setTimeout(()=>{
					try{
						shape_container.remove();
					}catch (e) {}
				}, 10000);
			}catch (e) {}
		}, 600);
	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	viewportToPixels(value) {
		let parts = value.match(/([0-9\.]+)(vh|vw)/);
		let q = Number(parts[1])
		let side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
		return side * (q/100)
	}

	convertMiliseconds(miliseconds) {
		let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

		total_seconds = parseInt(Math.floor(miliseconds / 1000));
		total_minutes = parseInt(Math.floor(total_seconds / 60));
		total_hours = parseInt(Math.floor(total_minutes / 60));
		days = parseInt(Math.floor(total_hours / 24));

		seconds = parseInt(total_seconds % 60);
		minutes = parseInt(total_minutes % 60);
		hours = parseInt(total_hours % 24);

		return hours+'ч. '+minutes+'мин.';
	}
	
	async shareStory (add) {
		try{
			this.setState({ popout: <ScreenSpinner/>, screen: true });
			await this.sleep(750);
			let element = document.getElementById('main');
			html2canvas(element, { allowTaint: true }).then(async canvas => {
				this.setState({ screen: false });
				await this.sleep(250);
				let blob = canvas.toDataURL('image/png');

				try{
					await bridge.send('VKWebAppShowStoryBox', {
						background_type: 'image', blob, attachment: { url: 'https://vk.com/app' + app_id, text: 'open', type: 'url' }
					});
					this.setState({ shared: true });
					if(add){
						await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] + 1).toString()});
						await bridge.sendPromise('VKWebAppStorageSet', {key: 'share_story' + prefix, value: Date.now().toString() });
						await this.updateStorage();
					}
				}catch (e) {}
				this.setState({ popout: null });
			});
		}catch (e) {
			console.error(e);
			this.setState({ snackbar:
					<Snackbar
						layout='vertical'
						onClose={() => this.setState({ snackbar: null })}
					>
						Ошибка
					</Snackbar>
			});
			this.setState({ popout: null, screen: false });
		}
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout}>
				<Panel id='main' style={{ zIndex: 1 }}>
					<div className={'animated-background'} style={{ width: '100vw', height: '100vh', background: this.state.screen && `url(${bg})` }}>
						<div id='bg_shapes'/>
						{
							!this.state.screen && need_balance &&
							<div style={{ position: 'absolute', top: os === ANDROID ? '6vh' : '3vh', left: '6vw' }} className='centered'>
								<Headline weight='bold' style={{ color: 'white' }}>Баланс: { this.state.data['balance' + prefix] > 0 ? this.state.data['balance' + prefix] : 0 }</Headline><img style={{ marginLeft: 8 }} src={sugar} height={32}/>
							</div>
						}
						<div className='absolute_centered' style={{ transform: 'translate(-50%, -70%)' }}>
							<div className={'centered_'} style={{ position: 'absolute', top: '10vh', width: '100%', color: 'white', textAlign: 'center' }}>
								{ false && <img src={cookieIcon} style={{ marginRight: 8, display: this.state.screen || need_balance && 'none' }} height={32}/> }
								<Title level='1' style={{ fontFamily: 'Font', fontWeight: '400', letterSpacing: '2px', fontSize: '28px' }}>
									{this.state.screen &&
										'Моё предсказание из печеньки на сегодня'.toUpperCase()
									}
								</Title>
							</div>
							<Lottie style={{pointerEvents: 'none', zIndex: -1, opacity: this.state.showText && .5 }} options={{
								animationData: animDataCookie,
								rendererSettings: {
									preserveAspectRatio: 'xMidYMid slice'
								}
							}} width={this.viewportToPixels('90vw')} isStopped={this.state.cookieAnimStarted}
							/>
							<div className='absolute_centered' style={{ backgroundImage: `url(${paper})`, backgroundRepeat: 'repeat', display: !this.state.showText && 'none', borderRadius: this.viewportToPixels('1vh') }}>
								<Headline weight='bold' style={{ padding: '16px', width: '70vw', textAlign: 'center' }}>{
									<div dangerouslySetInnerHTML={{ __html: this.state.phrase }} />
								}</Headline>
							</div>
							{
								!this.state.screen &&
								<Button disabled={!this.state.cookieAnimStarted} size={'xl'} style={{ backgroundColor: 'white', color: 'black' }} onClick={async ()=>{
									if(need_balance){
										if(this.state.data['balance' + prefix] > 0){
											await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] - 1).toString()});
											await this.updateStorage();
										}else{
											this.setState({ popout:
													<Alert
														actions={[{
															title: 'Получить сахар',
															autoclose: true,
															action: async () => {
																this.setState({ snackbar: null });
																if((!this.state.data['share_story' + prefix] || ( this.state.data['share_story' + prefix] > 0 && Date.now() - this.state.data['share_story' + prefix] >= 24 * 60 * 60 * 1000 ) ) && this.state.showText){
																	console.log('share_story');
																	await this.shareStory(true);
																}else if(!this.state.data['allow_msg' + prefix]){
																	console.log('allow_msg');
																	try{
																		await bridge.sendPromise('VKWebAppAllowMessagesFromGroup', {group_id, key: 'dBuBKe1kFcdemzB'});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] + 1).toString()});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'allow_msg' + prefix, value: 'true' });
																		await this.updateStorage();
																		this.setState({ snackbar:
																				<Snackbar
																					layout='vertical'
																					onClose={() => this.setState({ snackbar: null })}
																				>
																					Вы получили 1 сахар
																				</Snackbar>
																		});
																	}catch (e) {}
																}else if(!this.state.data['share_wall' + prefix]){
																	console.log('share_wall');
																	try{
																		await bridge.sendPromise('VKWebAppShowWallPostBox', {message: 'Открой свою печеньку 👉 vk.com/app' + app_id, attachments: 'photo-197650774_457239017'});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] + 1).toString()});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'share_wall' + prefix, value: 'true' });
																		await this.updateStorage();
																		this.setState({ snackbar:
																				<Snackbar
																					layout='vertical'
																					onClose={() => this.setState({ snackbar: null })}
																				>
																					Вы получили 1 сахар
																				</Snackbar>
																		});
																	}catch (e) {}
																}/*else if(!this.state.data['sub_group' + prefix]){
																	console.log('sub_group');
																	try{
																		await bridge.sendPromise('VKWebAppJoinGroup', {group_id});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] + 1).toString()});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'sub_group' + prefix, value: 'true' });
																		await this.updateStorage();
																		this.setState({ snackbar:
																				<Snackbar
																					layout='vertical'
																					onClose={() => this.setState({ snackbar: null })}
																				>
																					Вы получили 1 сахар
																				</Snackbar>
																		});
																	}catch (e) {}
																}*/else if(!this.state.data['allow_noty' + prefix]){
																	console.log('allow_noty');
																	try{
																		await bridge.sendPromise('VKWebAppAllowNotifications', {});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'balance' + prefix, value: (this.state.data['balance' + prefix] + 1).toString()});
																		await bridge.sendPromise('VKWebAppStorageSet', {key: 'allow_noty' + prefix, value: 'true' });
																		await this.updateStorage();
																		this.setState({ snackbar:
																				<Snackbar
																					layout='vertical'
																					onClose={() => this.setState({ snackbar: null })}
																				>
																					Вы получили 1 сахар
																				</Snackbar>
																		});
																	}catch (e) {}
																}else{
																	await this.sleep(100);
																	this.setState({ snackbar:
																			<Snackbar
																				layout='vertical'
																				onClose={() => this.setState({ snackbar: null })}
																			>
																				Бесплатный сахар закончился. Возвращайтесь через 2 часа.
																			</Snackbar>
																	});
																}
															},
														}]}
														onClose={()=> this.setState({ popout: null })}
													>
														<span className={'centered'} style={{ textAlign: 'center' }}><Title level={2} weight='bold'>Упс</Title><img src={e2} style={{ marginLeft: 8 }} height={24}/></span>
														<span className={'centered'} style={{ textAlign: 'center' }}><p>У Вас недостаточно</p><img src={sugar} height={32}/></span>
													</Alert>
											});
											return;
										}
									}else{
										if(this.state.data['used3' + prefix] === false){
											if(!this.state.data['used1' + prefix]){
												console.log('first open');
												try{
													await bridge.sendPromise('VKWebAppAllowMessagesFromGroup', {group_id, key: 'dBuBKe1kFcdemzB'});
												}catch (e) {
													this.setState({ snackbar:
															<Snackbar
																layout='vertical'
																onClose={() => this.setState({ snackbar: null })}
															>
																Необходимо сначала разрешить сообщения
															</Snackbar>
													});
													return;
												}
											}

											if(this.state.used){
												console.log('two open');
												if(!this.state.shared){
													this.setState({ snackbar:
															<Snackbar
																layout='vertical'
																onClose={() => this.setState({ snackbar: null })}
															>
																Необходимо сначала поделиться в истории
															</Snackbar>
													});
													return;
												}
											}

											if(this.state.three){
												console.log('three open');
												try{
													await bridge.sendPromise('VKWebAppShowWallPostBox', {message: 'Открой свою печеньку 👉 vk.com/app' + app_id, attachments: 'photo-197650774_457239017'});
													this.setState({ three: false });
												}catch (e) {
													this.setState({ snackbar:
															<Snackbar
																layout='vertical'
																onClose={() => this.setState({ snackbar: null })}
															>
																Необходимо сначала поделиться записью
															</Snackbar>
													});
													return;
												}
											}
										}else {
											console.log('four open');
											let last = Date.now() - this.state.data['used3' + prefix];
											if(last < 2 * 60 * 60 * 1000) {
												console.log('need wait 2h');
												this.setState({ snackbar:
														<Snackbar
															layout='vertical'
															onClose={() => this.setState({ snackbar: null })}
														>
															Для повтора подождите { this.convertMiliseconds(2 * 60 * 60 * 1000 - last) }
														</Snackbar>
												});
												return;
											}
										}

										if(!this.state.data['used1' + prefix]){
											await bridge.sendPromise('VKWebAppStorageSet', {key: 'used1' + prefix, value: Date.now().toString()});
										}else if(!this.state.data['used2' + prefix]){
											if(this.state.three === null) this.setState({ three: true });
											await bridge.sendPromise('VKWebAppStorageSet', {key: 'used2' + prefix, value: Date.now().toString()});
										}else{
											await bridge.sendPromise('VKWebAppStorageSet', {key: 'used3' + prefix, value: Date.now().toString()});
										}

										await this.updateStorage();
									}

									this.setState({ cookieAnimStarted: false, showText: false });
									setTimeout(()=>{
										this.setState({ cookieAnimStarted: true, showText: true, used: true, phrase: this.state.phrases[random.int(0, this.state.phrases.length-1)].replace('\n', '<br/>') });
									}, 2250)
								}}>{ need_balance ? 'Разломить за 1 ' : this.state.showText ? 'Попробовать снова' : 'Разломить печеньку' } { need_balance && <img style={{ marginLeft: 8 }} src={sugar} height={32}/> }</Button>
							}
						</div>
						{
							this.state.screen &&
							<div style={{ position: 'absolute', bottom: '18vh', width: '100vw' }} >
								<Title level={2} weight='semibold' style={{ color: 'white', width: '100vw', textAlign: 'center' }}>
									<span style={{ width: '80vw' }}>Переходи в приложение, чтобы получить предсказание</span>
								</Title>
								<br/><br/>
								<div className={'centered'}>
									<img crossOrigin={'anonymous'} style={{ transform: 'rotate(90deg)' }} height='26px' src={Icon16Chevron}/>
								</div>
							</div>
						}
						{
							(this.state.showText) && !this.state.screen &&
							<div style={{ position: 'absolute' , bottom: os === ANDROID ? '8vh' : '3vh', width: '100vw', zIndex: 1 }}>
								<Button onClick={async ()=>{
									await this.shareStory();
								}} style={{ background: '#ffffff00', color: 'white', fontSize: '20px', letterSpacing: '1px' }} before={<Icon28StoryOutline/>} size='xl'>Поделиться в истории</Button>
							</div>
						}

						{this.state.snackbar}
					</div>
				</Panel>
			</View>
		);
	}
}

export default App;