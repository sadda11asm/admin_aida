function pageUnit(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
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
		
		let modal	= document.createElement('div');
		modal.innerHTML =`<div class="modal" id="modal" style="display: none;">
							<div class="modal__backdrop"></div>
							<div class="modal__inner">
								<div class="form" id="modal-data">
									<div>
										<select class="form__input" id="form_select">
											<option value="0">Простой атрибут</option>
											<option value="1">Атрибут за цену</option>
											<option value="2">Общие атрибуты</option>
										</select>
										<input id="form_input" class="form__input" type="text" name="" plaseholder="add">
									</div>
									<div class="form__footer">
										<div id="form_button_close" class="form__button">Отмена</div>
										<div id="form_button_save" class="form__button">Создать</div>
									</div>
								</div>
							</div>
						</div>`;
		content_page.appendChild(modal);
		document.getElementById('form_button_close').addEventListener('click', (e)=> {
			document.getElementById('modal').style.display = 'none'
		})
		document.getElementById('form_button_save').addEventListener('click', (e)=> {
			document.getElementById('modal').style.display = 'none';
			let input = document.getElementById('form_input').value;
			let select = document.getElementById('form_select').value;
			POST(`/${par}`, 'method=POST&&name='+input+'&&type='+select, function(res, status) {
				console.log(res)
			})
			console.log(document.getElementById('form_select').value)
		})

		let dataList = '';

		for (var i = 0; i < res.unit.length; i++) {
			dataList += `<div class="table__row">
							<div class="table__cell" style="width: 45%;">${res.unit[i].name}</div>
							<div class="table__cell" style="width: 40%;">${res.unit[i].type}</div>
							<div class="table__cell" style="width: 15%;"><span style="button">Изменить</span><span style="button">Удалить</span></div>
						</div>`;
		}

		let table = document.createElement('div');

		table.innerHTML =`<div class="table">
							<div class="table__row table__row-header">
								<div class="table__cell" style="width: 45%;">Название</div>
								<div class="table__cell" style="width: 40%;">Тип</div>
								<div class="table__cell" style="width: 15%;">Действия</div>
							</div>
						</div>
						<div class="table" id = 'company-table'>${dataList}</div>`;

		content_page.appendChild(table);
	})
}
