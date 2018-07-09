function getControlLayout(par)
{
	setControlContent(par);
	setControlNav(par);
}

function setControlContent(par)
{
	switch(par) 
	{
		case 'product':
		pageProduct(par);
		break;
		case 'categories':
		pageCategory(par);
		break;
		case 'attribute':
		pageAttribute(par);
		break;
		case 'unit':
		pageUnit(par);
		break;
		case 'valute':
		pageValute(par);
		break;
		case 'cargo_type':
		pageCargoType(par);
		break;
		case 'tails_type':
		pageTailsType(par)
		break;
		case 'city':
		pageCity(par)
		break;
		case 'region':
		pageRegion(par)
		break;
		case 'country':
		pageCountry(par)
		break;
		case 'upload_type':
		pageUploadType(par)
		break;
		default:
		statusNotFound()
		break;
	}
}

function setControlNav(par)
{
	let div = document.getElementById('nav');
	if(div)
	{	
		let ul = document.createElement('ul');
		ul.classList.add('tabs-items');
		ul.innerHTML = 
				   `<li par = 'product' class="tab-item">Продукты</li>
					<li par = 'categories' class="tab-item ">Категории</li>
					<li par = 'attribute' class="tab-item">Атрибуты</li>
					<li par = 'unit' class="tab-item">Юниты</li>
					<li par = 'valute' class="tab-item">Валюта</li>
					<li par = 'cargo_type' class="tab-item">Тип грузов</li>
					<li par = 'tails_type' class="tab-item">Тип прицепа</li>
					<li par = 'city' class="tab-item">Город</li>
					<li par = 'region' class="tab-item">Регион</li>
					<li par = 'country' class="tab-item">Страна</li>
					<li par = 'upload_type' class="tab-item">Тип погрузки</li>`;

		let children = ul.children;
		for(let i = 0; i<children.length; i++) if(children[i].getAttribute('par') == par) children[i].classList.add('child-ative-link','active');

		ul.addEventListener('click', (e)=>
			{
				paintNav(e, ul);
				clickControlNav(e);
			});

		div.innerHTML = '';
		div.appendChild(ul);
	}
}

function clickControlNav(e)
{
	let target = e.target;
	let route = target.getAttribute('par');
	top.location.href = '/control/'+route;

}

function pageCity(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
	})
}

function pageRegion(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
	})
}

function pageCountry(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
	})
}

function showModal() {
	document.getElementById('modal').style.display = 'block';
}
 

