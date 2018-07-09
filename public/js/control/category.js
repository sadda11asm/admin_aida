function pageCategory(par) {
	content_page.innerHTML='';
	POST(`/${par}`, 'method=GET', function(res, status) {
		console.log(res);
	})
}