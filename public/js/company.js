function getCompanyLayout()
{
	setCompanyContent();
	setCompanyNav();
	getCompanies(0);
}

function setCompanyContent()
{
	content_page.innerHTML =
	`<div class="table">
		<div class="table__row table__row-header">
			<div class="table__cell company-name">Название компании</div>
			<div class="table__cell company-type">Тип компании</div>
			<div class="table__cell city">Город</div>
			<div class="table__cell rating">Рейтинг</div>
			<div class="table__cell action">Действия</div>
		</div>
	</div>
	<div class="table" id = 'company-table'></div>`;
}

function setCompanyNav()
{
	let div = document.getElementById('nav');
	let ul = document.createElement('ul');
	ul.classList.add('tabs-items');
	ul.innerHTML = `<li actual = '0' class="tab-item child-ative-link active">Новые</li>
					<li actual = '1' class="tab-item">Подтвержденные</li>
					<li actual = '2' class="tab-item">Заблокированные</li>`;

	ul.addEventListener('click', e=>
		{
			paintNav(e, ul);
			clickCompanyNav(e);
		});

	div.innerHTML = '';
	div.appendChild(ul);
}

function clickCompanyNav(e)
{
	let isActual = e.target.getAttribute('actual');

	if(isActual)
	{
		getCompanies(isActual);
	}
}

function getCompanies(isActual)
{
	let table  = document.getElementById('company-table');
	table.innerHTML = '';

	POST('/companies', 'method=GET&&isActual='+isActual, (res) =>
		{
			let data = res.companies;
			for(let i = 0; i < data.length; i++)
			{
				setCompanyLine(data[i], table);
			}
		});
}

function setCompanyLine(data, layout)
{
	let div = document.createElement('div');
	div.classList.add('table__row');

	let maxLength = 45;
	let name = data.companyName;
	if(name.length > maxLength) name = name.substr(0,maxLength) + '...';

	switch(data.isActual)
	{
		case 0:
		div.innerHTML = 
		`<div class="table__cell company-name" title = "${data.companyName}">${name}</div>
		<div class="table__cell company-type">${data.companyType}</div>
		<div class="table__cell city">${data.city}</div>
		<div class="table__cell rating">${data.rating}</div>
		<div class="table__cell action"><i class="fas fa-info"></i><i class = 'fa fa-check'></i> <i class = 'fa fa-lock'></i></div>`;
		break;

		case 1:
		div.innerHTML = 
		`<div class="table__cell company-name" title = "${data.companyName}">${name}</div>
		<div class="table__cell company-type">${data.companyType}</div>
		<div class="table__cell city">${data.city}</div>
		<div class="table__cell rating">${data.rating}</div>
		<div class="table__cell action"><i class="fas fa-info"></i><i class = 'fa fa-lock'></i></div>`;
		break;

		case 2:
		div.innerHTML = 
		`<div class="table__cell company-name" title = "${data.companyName}">${name}</div>
		<div class="table__cell company-type">${data.companyType}</div>
		<div class="table__cell city">${data.city}</div>
		<div class="table__cell rating">${data.rating}</div>
		<div class="table__cell action"><i class="fas fa-info"></i><i class = 'fa fa-unlock'></i></div>`;
		break;

		default:
		console.log('ERROR');
		break;
	}

	let lock 	= div.querySelector('.fa-lock');
	let unlock 	= div.querySelector('.fa-unlock');
	let accept 	= div.querySelector('.fa-check');
	let info 	= div.querySelector('.fa-info');

	if(info)
		info.addEventListener('click', (e)=>
			{
				top.location.href = `/company/${data.idCompany}`;
			});

	if(lock)
		lock.addEventListener('click', (e)=>
			{
				if(confirm('Are you sure?'))
				POST('/companies', `method=PUT&&idCompany=${data.idCompany}&&isActual=2`, (res)=>
					{
						console.log('locked ' + data.companyName);
						layout.removeChild(div);
					});
			});
	
	if(unlock)
		unlock.addEventListener('click', (e)=>
			{
				if(confirm('Are you sure?'))
				POST('/companies', `method=PUT&&idCompany=${data.idCompany}&&isActual=1`, (res)=>
					{
						console.log('unlocked ' + data.companyName);
						layout.removeChild(div);
					});
			});

	if(accept)
		accept.addEventListener('click', (e)=>
			{
				if(confirm('Are you sure?'))
				POST('/companies', `method=PUT&&idCompany=${data.idCompany}&&isActual=1`, (res)=>
					{
						console.log('accepted ' + data.companyName);
						layout.removeChild(div);
					});
			});

	layout.appendChild(div);
}

function getCompanyInfo(id) {
	POST('/companies/'+id, 'method=GET', function(res, stat) 
	{
		if(stat == 200 && res.companyInfo.length > 0) setCompanyInfo(res.companyInfo[0], id);
		else statusNotFound();
	})
}

function getCompanyPersonal(id) {
	POST('/companies/'+id+'/users', 'method=GET', function(res, stat) 
	{
		if(stat == 200) {
			console.log(res);
			if (res.users.length>0) {

				let usersTable = document.createElement('div');

				let users = '';

				for (var i = 0; i < res.users.length; i++) {
					users += `<div class="table__row">
									<div class="table__cell table__cell_width">${res.users[i].firstname}</div>
									<div class="table__cell table__cell_width">${res.users[i].lastname}</div>
									<div class="table__cell table__cell_width">${res.users[i].email}</div>
									<div class="table__cell table__cell_width">${getRoleUser(res.users[i].role)}</div>
								</div>`
				}

				usersTable.innerHTML = `<div class="title">Сотрудники</div>
										<div class="table">
											<div class="table__row table__row-header">
												<div class="table__cell table__cell_width">Имя</div>
												<div class="table__cell table__cell_width">Фамилия</div>
												<div class="table__cell table__cell_width">Почта</div>
												<div class="table__cell table__cell_width">Должность</div>
											</div>
											${users}
										</div>`;

				content_page.appendChild(usersTable);

			}

		} else {
			statusNotFound()
		}
	})
}

function setCompanyInfo(data, id) {
	content_page.innerHTML = '';

	let div = document.createElement('div');
	div.innerHTML =`<div class="title">Компания</div>

					<div class="table">
							
						<div class="table__row table__row-header">
							<div class="table__cell table__cell_width">Название компании</div>
							<div class="table__cell table__cell_width">Тип компании</div>
							<div class="table__cell table__cell_width">Город</div>
							<div class="table__cell table__cell_width">Контактный номер</div>
						</div>

						<div class="table__row">
							<div class="table__cell table__cell_width">${data.companyName}</div>
							<div class="table__cell table__cell_width">${data.companyType}</div>
							<div class="table__cell table__cell_width">${data.city}</div>
							<div class="table__cell table__cell_width">${data.phone}</div>
						</div>


						<div class="table__row table__row-header">
							<div class="table__cell table__cell_width">Почта</div>
							<div class="table__cell table__cell_width">Статус</div>
							<div class="table__cell table__cell_width">Рейтинг</div>
							<div class="table__cell table__cell_width">Описание</div>
						</div>


						<div class="table__row">
							<div class="table__cell table__cell_width">${data.email}</div>
							<div class="table__cell table__cell_width">${getTypeName(data.isActual)}</div>
							<div class="table__cell table__cell_width">${data.rating}</div>
							<div class="table__cell table__cell_width">${data.description}</div>
						</div>
						
						<div class="table__row table__row-header">
							<div class="table__cell table__cell_width">Физическии адрес</div>
							<div class="table__cell table__cell_width">Легальный адрес</div>
							<div class="table__cell table__cell_width">Номер регистрации</div>
							<div class="table__cell table__cell_width">Bin</div>
						</div>

						<div class="table__row">
							<div class="table__cell table__cell_width">${data.physicalAddress}</div>
							<div class="table__cell table__cell_width">${data.legalAddress}</div>
							<div class="table__cell table__cell_width">${data.registrationNumber}</div>
							<div class="table__cell table__cell_width">${data.bin}</div>
						</div>
					</div>`;
	content_page.appendChild(div);
	getCompanyPersonal(id);

}

function getTypeName(i)
{
	switch(i)
	{
		case 0: return 'Новая';
		case 1: return 'Подтверждена';
		case 2: return 'Заблокирована';
	}
}

function getRoleUser(i)
{
	switch(i)
	{
		case 3: return 'Директор';
		case 2: return 'Бугалтер';
		default: return 'Работник';
	}
}