function pageCargoType(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		if (res.status==200) {
			console.log(res)
			let button = document.createElement('div');
			let title = document.createElement('div');
			title.classList.add('title')
			button.innerHTML = 'Добавить';
			button.classList.add('button');
			button.addEventListener('click', (e)=> {
				showModal();
			})
			title.appendChild(button);	
			content_page.appendChild(title);	

			createCargoTypeAddModal(par)

			let dataList = '';

			for (var i = 0; i < res.cargoTypes.length; i++) {
				let attr = '';
				if (res.cargoTypes[i].attributes) {
					let obj = res.cargoTypes[i].attributes[0];
					for (let index in obj) {
						attr += `<div>
									<div style="width: 80%;">${index}</div>
									<div style="width: 20%;">${obj[index]}</div>
								</div>`;
					}
				} else {
					attr = '-';
				}

				dataList += `<div class="table__row">
								<div class="table__cell" style="width: 20%;">${res.cargoTypes[i].name}</div>
								<div class="table__cell" style="width: 35%;">${res.cargoTypes[i].description}</div>
								<div class="table__cell table__cell_attr">${attr}</div>
								<div class="table__cell" style="width: 15%">
									<span style="button">Изменить</span>
									<span style="button">Удалить</span>
								</div>
							</div>`;
			}

			let table = document.createElement('div');

			table.innerHTML =`<div class="table">
								<div class="table__row table__row-header">
									<div class="table__cell" style="width: 20%;">Названия</div>
									<div class="table__cell" style="width: 35%;">Описания</div>
									<div class="table__cell" style="width: 35%;">Описания</div>
									<div class="table__cell" style="width: 15%;">Действия</div>
								</div>
							</div>
							<div class="table" id = 'company-table'>${dataList}</div>`;

			content_page.appendChild(table);

		} else {
			console.log(res.status);
		}
	})
}

function createCargoTypeAddModal(par) {

	// let modal	= document.createElement('div');

	// modal.innerHTML =`<div class="modal" id="modal" style="display: none;">
	// 					<div class="modal__backdrop"></div>
	// 					<div class="modal__inner">
	// 						<div class="form" id="modal-data">
	// 							<div>
	// 								<input id="form_input" class="form__input" type="text">
	// 							</div>
	// 							<div class="form__footer">
	// 								<div id="form_button_close" class="form__button">Отмена</div>
	// 								<div id="form_button_save" class="form__button">Создать</div>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>`;

	// content_page.appendChild(modal);

	// document.getElementById('form_button_close').addEventListener('click', (e)=> {
	// 	document.getElementById('modal').style.display = 'none'
	// })
	// document.getElementById('form_button_save').addEventListener('click', (e)=> {
	// 	document.getElementById('modal').style.display = 'none';
	// 	let name = document.getElementById('form_input').value;
	// 	POST(`/${par}`, 'method=POST&&name='+name, function(res, status) {
	// 		console.log(res)
	// 	})
	// })
	
}