function getDocumentsLayout()
{
	setDocumentsNav()
	setDocumentsContent()

}

function setDocumentsContent(){
	content_page.innerHTML = 
	`<div class="table">
		<div class="table__row table__row-header">
			<div class="table__cell"></div>
			<div class="table__cell"></div>
			<div class="table__cell"></div>
		</div>
	</div>
	`
	getDocuments()

}


function getDocuments() {
	POST('/documents', 'method=GET', (res)=> {
		console.log(res)
	})
}
function setDocumentsNav() {

	let div = document.getElementById('nav');

	let ul = document.createElement('ul');

	ul.classList.add('tabs-items');

	// ul.innerHTML = `<li class="tab-item child-ative-link active">Покупатели</li>
	// 				<li class="tab-item">Продавцы</li>`;

	div.innerHTML = '';

	ul.addEventListener('click', (e) => {
		clickDocumentsNav(e);
		paintNav(e, ul);
	});

	div.appendChild(ul);

}

// function clickDocumentsNav(event)
// {
// 	POST('/companies/'+ 277, 'method=GET', (res)=> {
// 		console.log(res)
// 	})
// }

