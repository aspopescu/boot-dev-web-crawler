function printReport(pages) {
	console.log(`--- Start of report  ---`)
	const descPages = sortObject(pages)
	for (const a of descPages) {
		console.log(`Found ${a[1]} internal links to ${a[0]}`)
	}
	console.log(`--- End of report  ---`)
}

function sortObject(object) {
	let workArray = []
	for (const [key, value] of Object.entries(object)) {
		workArray.push([key, value])
	}
	workArray.sort((a, b) => b[1] - a[1])
	return workArray
}

module.exports = {
	printReport ,
}

