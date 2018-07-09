//Переменные 
	let domen = 'http://aida.market:3030/'; 
//Скрипт
	generateContent();

//Функции
	function generateContent()
	{
		let href = top.location.href.split('/');
		console.log(href)

		hr = href[3];
		params = href[4];

		if(!hr) hr = 'control';

		paintMenu(hr);

		switch(hr)
		{
			case 'control':
				if(!params) getControlLayout('product');
				else getControlLayout(params);
			break; 
			case 'company':
				if(!params)
					getCompanyLayout();
				else
					getCompanyInfo(params);
			break;
			case 'documents':
				getDocumentsLayout();
			break;
			case 'mailing':
				//временно
				document.getElementById('nav').innerHTML = '';
				content_page.innerHTML='';
			break;
			case 'notfound':
				getNotFoundPage();
			break;
			default:
				statusNotFound();
			break;
		}
	}

	function paintMenu(hr)
	{
		let items = document.getElementsByClassName('sidebar-item');
		for(let i = 0; i <items.length; i++)
		{
			items[i].classList.remove('child-ative-link', 'sidebar-active');
			if(items[i].getAttribute('hr') == hr)
			{
				items[i].classList.add('child-ative-link', 'sidebar-active');
			}
		}
	}

//Обработчики

	if (location.pathname != '/notfound') {
		document.getElementById('pages').addEventListener('click', e => 
		{
			let target = e.target;

			let hr = target.getAttribute('hr');
			if(!hr) hr = target.parentNode.getAttribute('hr');
			if(!hr) hr = target.parentNode.parentNode.getAttribute('hr');

			if(hr) window.history.pushState({page_id: 0, page: 'page'}, '', domen + hr);
			else console.log(undefined + ' page')

			generateContent();
		});	

		document.getElementById('sidebar_width').addEventListener('click', (e)=> 
		{
			let aside = document.getElementsByTagName('aside')[0];
			let main = document.getElementsByTagName('main')[0];
			let icon_arrow = document.getElementById('icon_arrow');
			if (aside.classList.contains('collapse') && main.classList.contains('collapse')) 
			{
				aside.classList.remove('collapse');
				main.classList.remove('collapse');
				icon_arrow.style.marginRight = '10px';
				icon_arrow.classList.remove('fa-arrow-right');
				icon_arrow.classList.add('fa-arrow-left');
				document.getElementById('text_hide').style.display = 'inline-block';
			} else 
			{
				aside.classList.add('collapse');
				main.classList.add('collapse');
				icon_arrow.style.marginRight = '0px';
				icon_arrow.classList.add('fa-arrow-right');
				icon_arrow.classList.remove('fa-arrow-left');
				document.getElementById('text_hide').style.display = 'none';
			}
		});
	}
	window.onpopstate = function(e)
	{
		generateContent();
	}
//