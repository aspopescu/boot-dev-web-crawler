const jsdom = require("jsdom")
const { JSDOM } = jsdom

function normalizeURL(url) {
	const myURL = new URL(url)
	let path = ''
	const urlPathname = myURL.pathname
	if (urlPathname.at(-1) === '/') {
		path = urlPathname.substring(0, urlPathname.length - 1)
	} else {
		path = urlPathname
	}
	const normalizedURL = `${myURL.hostname}${path}`
	return normalizedURL
}

function getURLsFromHTML(string_of_html, baseURL) {
	const dom = new JSDOM(string_of_html)
	extractedURLs = []
	let domURLs = dom.window.document.querySelectorAll('a')
	for (const d of domURLs) {
		if (d.href.at(0) === '/') {
			extractedURLs.push(`${baseURL}${d.href}`);
			
		} else {
			extractedURLs.push(d.href);
		}
	}
	return extractedURLs
}

async function crawlPage(baseURL, currentURL, pages) {
	const base = new URL(baseURL)
	const current = new URL(currentURL)
	if (base.hostname !== current.hostname) {
		//console.log(`Mismatch found base: ${base.hostname}, current: ${current.hostname}`)
		return pages
	}

	const normalizedCurrentURL = normalizeURL(currentURL)
	if (pages[normalizedCurrentURL] !== undefined) {
		pages[normalizedCurrentURL] ++
		return pages
	} else {
		pages[normalizedCurrentURL] = 1
	}

	let responseHTMLbody = ''
	try {
		
		console.log(`Crawling: ${normalizedCurrentURL}`)
		const response = await fetch(currentURL)
		const responseStatus = response.status
		//console.log(`Status code is: ${responseStatus}`)
		if (responseStatus >= 400) {
			console.log(`Status code check returned an error, status code: ${responseStatus}`)
			return pages
		}
		let responseContentType = response.headers.get("Content-Type")
		responseContentType = responseContentType.split(';')[0]
		//console.log(`Content-Type is: ${responseContentType}`)
		if (responseContentType !== 'text/html') {
			console.log(`Content-Type check returned an error, Content-Type: ${responseContentType}`)
			return pages
		}
		responseHTMLbody = await response.text()
		//console.log(`HTML body is: ${responseHTMLbody}`)
	} catch (err) {
		console.log(`An error was thrown: ${err.message}`)
	}

	const extractedURLs = getURLsFromHTML(responseHTMLbody, baseURL)
	//console.log(`Extracted URLs are: ${extractedURLs}`)
	for (const extractedURL of extractedURLs) {
		//console.log(`Extracted URL is: ${extractedURL}`)
		pages = await crawlPage(baseURL, extractedURL, pages)
	}
	//console.log(`pages in crawler: ${JSON.stringify(pages)}`)
	return pages
}

module.exports = {
	normalizeURL ,
	getURLsFromHTML ,
	crawlPage ,
}

