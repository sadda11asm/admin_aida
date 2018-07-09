let dictionary = document.getElementById('dictionary')
dictionary.onchange = function() {
	console.log('--- onchange ---')
	dictionary[0].disabled = true
	let selectIndex = dictionary.selectedIndex
	let input = document.createElement('input')
	let button = document.createElement('input')
	let append = document.getElementById('append')
	let xhr = new XMLHttpRequest()
	append.innerHTML = null
	switch(selectIndex) {
		case 1:
			let id = 0 
			xhr.open("GET", `/categories/${id}`, true)
			xhr.onloadend = function(){
				try	{ 
					if (xhr.status == 200) {
						let categories = JSON.parse(xhr.response)
						let newSelect = document.createElement('select')
						newSelect.setAttribute('id', 'cat-0')
						newSelect.setAttribute('required', true)
						// newSelect.setAttribute('name', 'cat-0')
						newSelect.setAttribute('onchange','selectCategories()')
						let option = ``;
						for(let i of categories.subCategories) {
							option += `<option value=${i.id}>${i.name}</option>`
						}
						newSelect.innerHTML = option
						append.appendChild(newSelect)
						let subCat = document.createElement("div")
						subCat.setAttribute('id', 'subCat')
						append.appendChild(subCat)
					}else{
						console.log(xhr.status)
						console.log(xhr.response)
					}
				}catch(error) {
					console.log(error)
				}
			}
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send()
			break;
		case 2:
			input.setAttribute('type', 'text')
			input.setAttribute('required', true)
			input.setAttribute('name', 'name')
			input.setAttribute('placeholder', 'NEW ATTRIBUTE')
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			append.appendChild(input)
			append.appendChild(button)
			break;
		case 3:
			button.setAttribute('value', 'Создать')
			button.setAttribute('type', 'submit')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW PRODUCT')
			append.appendChild(input)
			append.appendChild(button)
			break;
		case 4:
			let type = document.createElement('select')
			type.setAttribute('name', 'type')
			let option = `<option value="0">Простой атрибут</option>
			<option value="1">Для выставления цен</option><option value="2">Оба варианта</option>`
			type.innerHTML = option
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW UNIT')
			append.appendChild(input)
			append.appendChild(type)
			append.appendChild(button)
			break;
		case 5:
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW VALUTE')
			append.appendChild(input)
			append.appendChild(button)
			break;
		case 6: 
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW CARGO_TYPE')
			let input2 = document.createElement('input')
			append.appendChild(input)
			input2.setAttribute('type', 'text')
			input2.setAttribute('name', 'description')
			input2.setAttribute('required', true)
			input2.setAttribute('placeholder', 'description')
			append.appendChild(input2)
			// let input3 = document.createElement('input')
			// input3.setAttribute('type', 'text')
			// input3.setAttribute('name', 'attributes')
			// input3.setAttribute('required', true)
			// input3.setAttribute('placeholder', 'attributes')
			// append.appendChild(input3)
			append.appendChild(button)
			break;
		case 7:
			// let id = 0 
			// xhr = new XMLHttpRequest()
			xhr.open("GET", `/tails_type/`, true)
			xhr.onloadend = function(){
				try	{ 
					if (xhr.status == 200) {
						let cargo_types = JSON.parse(xhr.response)
						newSelect = document.createElement('select')
						newSelect.setAttribute('id', 'car-0')
						newSelect.setAttribute('name', 'id');
						newSelect.setAttribute('required', true)
						// newSelect.setAttribute('name', 'cat-0')
						// newSelect.setAttribute('onchange','selectCargoTypes()')
						let option = ``;
						for(let i of cargo_types.cargo_types) {
							option += `<option value=${i.id}>${i.name}</option>`
						}
						newSelect.innerHTML = option
						append.appendChild(newSelect)
						// let subCat = document.createElement("div")
						// subCat.setAttribute('id', 'subCat')
						// append.appendChild(subCat)
						input = document.createElement('input')
						button = document.createElement('input')
						input.setAttribute('type', 'text')
						input.setAttribute('name', 'name')
						input.setAttribute('required', true)
						input.setAttribute('placeholder', 'NEW TAILS_TYPE')
						button.setAttribute('type', 'submit')
						button.setAttribute('value', 'Создать')
						// subCat.appendChild(newSelect)
						append.appendChild(input)
						let input2 = document.createElement('input')
						input2.setAttribute('type', 'text')
						input2.setAttribute('name', 'description')
						input2.setAttribute('required', true)
						input2.setAttribute('placeholder', 'description')
						append.appendChild(input2)
						append.appendChild(button)
						// append.appendChild(subCat)
					}else{
						console.log(xhr.status)
						console.log(xhr.response)
					}
				}catch(error) {
					console.log(error)
				}
			}
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send()
			break;
		case 8: 
			xhr.open("GET", `/tails_type/`, true)
			xhr.onloadend = function(){
				try	{ 
					if (xhr.status == 200) {
						let tails_types = JSON.parse(xhr.response)
						newSelect = document.createElement('select')
						newSelect.setAttribute('id', 'car-0')
						newSelect.setAttribute('name', 'id');
						newSelect.setAttribute('required', true)
						// newSelect.setAttribute('name', 'cat-0')
						// newSelect.setAttribute('onchange','selectCargoTypes()')
						let option = ``;
						for(let i of cargo_types.cargo_types) {
							option += `<option value=${i.id}>${i.name}</option>`
						}
						newSelect.innerHTML = option
						append.appendChild(newSelect)
						// let subCat = document.createElement("div")
						// subCat.setAttribute('id', 'subCat')
						// append.appendChild(subCat)
						input = document.createElement('input')
						button = document.createElement('input')
						input.setAttribute('type', 'text')
						input.setAttribute('name', 'name')
						input.setAttribute('required', true)
						input.setAttribute('placeholder', 'NEW TAILS_TYPE')
						button.setAttribute('type', 'submit')
						button.setAttribute('value', 'Создать')
						// subCat.appendChild(newSelect)
						append.appendChild(input)
						let input2 = document.createElement('input')
						input2.setAttribute('type', 'text')
						input2.setAttribute('name', 'description')
						input2.setAttribute('required', true)
						input2.setAttribute('placeholder', 'description')
						append.appendChild(input2)
						append.appendChild(button)
						// append.appendChild(subCat)
					}else{
						console.log(xhr.status)
						console.log(xhr.response)
					}
				}catch(error) {
					console.log(error)
				}
			}
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send()
			break;
		case 9: 
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW CITY')
			append.appendChild(input)
			append.appendChild(button)
			break;
		case 10: 
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW REGION')
			append.appendChild(input)
			append.appendChild(button)
			break;
		case 11: 
			button.setAttribute('type', 'submit')
			button.setAttribute('value', 'Создать')
			input.setAttribute('type', 'text')
			input.setAttribute('name', 'name')
			input.setAttribute('required', true)
			input.setAttribute('placeholder', 'NEW COUNTRY')
			append.appendChild(input)
			append.appendChild(button)
			break;
	}	
}

function selectCategories() {
	// let sel = document.getElementById("car-0").selectedIndex
	// let id = document.getElementById("car-0").options[sel].value

	let sel = document.getElementById("cat-0").selectedIndex
	let id = document.getElementById("cat-0").options[sel].value

	let subCat = document.getElementById('subCat')
	subCat.innerHTML = null
	let xhr = new XMLHttpRequest()
	xhr.open("GET", `/categories/${id}`, true)
	xhr.onloadend = function() {
		try	{ 
			if (xhr.status == 200) {
				let newSelect = document.createElement('select')
				newSelect.setAttribute("id", "cat-1")
				// newSelect.setAttribute("name", "cat-1")
				newSelect.setAttribute('required' , true)
				let categories = JSON.parse(xhr.response)
				let option = `<option value="0">ADD NEW SUBCATEGORY</option>`;
				for(let i of categories.subCategories) {
					option += `<option value=${i.id}>${i.name}</option>`
				}
				newSelect.innerHTML =  option;
				console.log(newSelect)
				let input = document.createElement('input')
				let button = document.createElement('input')
				input.setAttribute('type', 'text')
				input.setAttribute('name', 'name')
				input.setAttribute('required', true)
				button.setAttribute('type', 'submit')
				button.setAttribute('value', 'Создать')
				subCat.appendChild(newSelect)
				subCat.appendChild(input)
				subCat.appendChild(button)
				append.appendChild(subCat)
			} else {
				console.log(xhr.status)
				console.log(xhr.response)
			}
		}catch(error) {
			console.log(error)
		}
	}
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.send()
}

let form = document.getElementById('form')
form.onsubmit = function(event) {
	event.preventDefault()
	let selectedIndex, action;
	selectedIndex = dictionary.selectedIndex
	let formData = {}
	switch(selectedIndex) {
		case 1:
			action = "/categories"	
			let subCat = document.getElementById("cat-1")
			let selSubCat = subCat.selectedIndex;
			let valueSubCat = subCat.options[selSubCat].value
			if (valueSubCat == 0) {
				let cat = document.getElementById("cat-0")
				let selCat = cat.selectedIndex;
				let valueCat = cat.options[selCat].value
				formData.parentCategoryId = valueCat
				formData.name = form.name.value
			} else {
				formData.parentCategoryId = valueSubCat
				formData.name = form.name.value
			}
			break;
		case 2:
			action = "/attribute"
			formData.name = form.name.value
			break;
		case 3:
			action = "/product"
			formData.name = form.name.value
			break;
		case 4:
			action = "/unit"
			console.log('--- type ---')
			console.log(typeof form.type.value)
			formData.name = form.name.value
			formData.type = form.type.value
			break;
		case 5:
			action = "/valute"
			formData.name = form.name.value
			break;
		case 6:
			action = "/cargo_type"
			formData.name = form.name.value
			formData.description = form.description.value
			// formData.attributes = form.attributes.value
			break;
		case 7: 
			action = "/tails_type"
			formData.cargoId = form.id.value
			formData.description = form.description.value
			formData.name = form.name.value
			break;
		case 8:
			action = "/upload_type"
			formData.cargoId = form.id.value
			formData.description = form.description.value
			formData.name = form.name.value
			break;
		case 9:
			action = "/region"
			formData.name = form.name.value
			break;
		case 10:
			action = "/city"
			formData.name = form.name.value
			break;
		case 11:
			action = "/country"
			formData.name = form.name.value
			break;

	}
	let xhr = new XMLHttpRequest()
	xhr.open('POST', action)
	xhr.onloadend = function() {
		let append = document.getElementById('append')
		if(this.status == 201) {
			append.innerHTML = null
			dictionary.selectedIndex = 0
			let p = document.createElement('p')
			let response = JSON.parse(xhr.response)
			p.innerHTML = response.message
			append.appendChild(p)
			console.log(response)
		} else { 
			let append = document.getElementById('append')
			append.innerHTML = null
			dictionary.selectedIndex = 0
			let p = document.createElement('p')
			p.innerHTML = this.responseText
			append.appendChild(p)
			console.log(this.response)
		}
	}
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
	xhr.setRequestHeader('Content-type', 'application/json')
	xhr.send(JSON.stringify(formData))
}