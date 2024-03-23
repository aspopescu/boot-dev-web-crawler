const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')


const testURL1 = 'https://blog.boot.dev/path/'
const testURL2 = 'https://blog.boot.dev/path'
const testURL3 = 'http://blog.boot.dev/path/'
const testURL4 = 'http://blog.boot.dev/path'
const expectedURL1 = 'blog.boot.dev/path'


test(`normalizeURL: ${testURL1} to ${expectedURL1}`, () => {
	expect(normalizeURL(testURL1)).toEqual(expectedURL1);
});

test(`normalizeURL: ${testURL2} to ${expectedURL1}`, () => {
	expect(normalizeURL(testURL2)).toEqual(expectedURL1);
});

test(`normalizeURL: ${testURL3} to ${expectedURL1}`, () => {
	expect(normalizeURL(testURL3)).toEqual(expectedURL1);
});

test(`normalizeURL: ${testURL4} to ${expectedURL1}`, () => {
	expect(normalizeURL(testURL4)).toEqual(expectedURL1);
});

const testHTML1 = `
<html>
    <body>
	<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
const testHTML2 = `
<html>
    <body>
	<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
	<a href="http://test.dev"><span>second a href Go to Boot.dev</span></a>
    </body>
</html>
`
const testHTML3 = `
<html>
    <body>
	<a href="/xyz/efg.html"><span>relative url Go to Boot.dev</span></a>
	<a href="https://blog.boot.dev/abc/xyz"><span>second relative url Go to Boot.dev</span></a>
    </body>
</html>
`
const expectedListOfURLs1 = ['https://blog.boot.dev/']
const expectedListOfURLs2 = ['https://blog.boot.dev/', 'http://test.dev/']
const expectedListOfURLs3 = ['https://blog.boot.dev/xyz/efg.html', 'https://blog.boot.dev/abc/xyz']
const testBaseURL1 = 'https://blog.boot.dev'

test(`getURLsFromHTML: extract 1 URL`, () => {
	expect(getURLsFromHTML(testHTML1, testBaseURL1)).toEqual(expectedListOfURLs1);
});

test(`getURLsFromHTML: extract 2 URLs from absolute URLs`, () => {
	expect(getURLsFromHTML(testHTML2, testBaseURL1)).toEqual(expectedListOfURLs2);
});

test(`getURLsFromHTML: extract 1 URL from relative URL and 1 URL from absolute URL`, () => {
	expect(getURLsFromHTML(testHTML3, testBaseURL1)).toEqual(expectedListOfURLs3);
});






