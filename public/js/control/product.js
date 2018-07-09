function pageProduct(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
		if (res.status==200) {

			let button = document.createElement('div');
			let title = document.createElement('div');

			title.classList.add('title')
			button.innerHTML = 'Добавить';
			button.classList.add('button');

			button.addEventListener('click', (e)=> {
				showAddModal();
			})

			title.appendChild(button);	
			content_page.appendChild(title);	

			createProductAddModal(par);
			createProductEditModal(par);
			
			let productRow = document.createElement('div');
			productRow.id = 'company-table';
			productRow.classList.add('table');

			for (var i = 0; i < res.products.length; i++) {
				productRow.appendChild(createProductRow(res.products[i].id, res.products[i].name)) 
			}

			let table = document.createElement('div');

			table.innerHTML =`<div class="table">
								<div class="table__row table__row-header">
									<div class="table__cell" style="width: 85%;">Название</div>
									<div class="table__cell" style="width: 15%;">Действия</div>
								</div>
							</div>`;

			table.appendChild(productRow)

			content_page.appendChild(table);

		} else {
			console.log(res.status);
		}
	})
}

function createProductRow(id, name) {
	let div = document.createElement('div');
	div.classList.add('table__row');
	div.innerHTML = `<div class="table__cell" style="width: 85%;">${name}</div>
					<div class="table__cell" style="width: 15%;">
						<span id=edit_${id}>Изменить</span>
						<span id="remove_${id}">Удалить</span>
					</div>`;

	div.querySelector('#remove_'+id).addEventListener('click', (e)=> {
		div.remove();
	})

	div.querySelector('#edit_'+id).addEventListener('click', (e)=> {
		showEditModal(id, name);
	})

	return div;				
	
}

function createProductAddModal(par) {

	let modal	= document.createElement('div');

	modal.innerHTML =`<div class="modal" id="modal" style="display: none;">
						<div class="modal__backdrop"></div>
						<div class="modal__inner">
							<div class="form" id="modal-data">
								<div>
									<input id="form_input" class="form__input" type="text">
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
		let name = document.getElementById('form_input').value;
		POST(`/${par}`, 'method=POST&&name='+name, function(res, status) {
			console.log(res)
		})
	})
}

function createProductEditModal(par) {
	let modal = document.createElement('div');

	modal.innerHTML =`<div class="modal" id="edit_modal" style="display: none;">
						<div class="modal__backdrop"></div>
						<div class="modal__inner">
							<div class="form" id="edit_modal-data">
								<div>
									<input id="edit_form_hidden_input" type="text" style="display: none;">
									<input id="edit_form_input" class="form__input" type="text">
								</div>
								<div class="form__footer">
									<div id="edit_form_close" class="form__button">Отмена</div>
									<div id="edit_form_edit" class="form__button">Изменить</div>
								</div>
							</div>
						</div>
					</div>`;

	content_page.appendChild(modal);

	document.getElementById('edit_form_close').addEventListener('click', (e)=> {
		document.getElementById('edit_modal').style.display = 'none'
	})
	document.getElementById('edit_form_edit').addEventListener('click', (e)=> {
		document.getElementById('edit_modal').style.display = 'none';

		let name = document.getElementById('edit_form_input').value;
		let id = document.getElementById('edit_form_hidden_input').value;

		// POST(`/${par}`, 'method=POST&&name='+name+'&&id='+id, function(res, status) {
		// 	console.log(res)
		// })
	})
}

function showAddModal() {
	document.getElementById('modal').style.display = 'block';
}

function showEditModal(id, name) {
	document.getElementById('edit_modal').style.display = 'block';
	document.getElementById('edit_form_input').value = name;
	document.getElementById('edit_form_hidden_input').value = id;
}