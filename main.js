const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')
const { printReport } = require(`./report.js`)

async function main(){
	let argument = ''
	if (process.argv.length < 3){
		console.log('Argument was not provided, provide one.')
	} else if (process.argv.length > 3){
		console.log('Too many arguments provided.')
	} else {
		argument = process.argv[2]
		console.log(`Argument provided to web crawler: ${argument}`)
	}
	const pages = await crawlPage(argument, argument, {})
		
	//console.log(`pages in main: ${JSON.stringify(pages)}`) }

	printReport(pages)
}
main()
