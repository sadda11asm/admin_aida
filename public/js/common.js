var content_page = document.getElementById('content-page');

function POST(route, params, funct)
{
	let req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4) 
			{
				let res = JSON.parse(req.response);
				funct(res, req.status);
			}
	}
	req.open("POST", route);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.send(params);
}

function paintNav(e, ul)
{
	let target = e.target;
	let li = ul.children;

	for(let i = 0; i <li.length; i++)
	{
		li[i].classList.remove('child-ative-link','active');
		if(target == li[i])
		{
			li[i].classList.add('child-ative-link','active');
		}
	}	
}

function statusNotFound()
{
	top.location.href = '/notfound';
}

function getNotFoundPage()
{
	document.getElementsByTagName('body')[0].innerHTML = 
	`<h3><a href = "/">Вернуться на Родину</a></h3>
	<img class = "notFound" src = "/img/404.gif">`;

	document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}