phantom.casperPath = '/usr/local/lib/node_modules/casperjs';
phantom.injectJs(phantom.casperPath + "/bin/bootstrap.js");
phantom.casperTest = true;

var utils  = require('utils'),
	casper = require('casper').create({
		verbose: true, 
	    logLevel: 'info',
	    pageSettings: {
	         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
	    }
	}),
	system = require('system');

var xpath = require('casper').selectXPath;

var args = system.args;

var host = args[1]
var credentials = {
	username: args[2],
	password: args[3]
}
var subject = args[4];
var course = args[5];

var CrawlerService = require('./services/CrawlerService');

var crawler = new CrawlerService(host, casper, xpath);

crawler.login(credentials);
crawler.list_courses();
crawler.list_courses_by_subject(subject);
crawler.show_course(course);

crawler.exit();