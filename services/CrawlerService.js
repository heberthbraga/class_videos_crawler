var require 	= patchRequire(require);
var utils 		= require('utils');
var fs 				= require('fs');
var urls 			= {};

module.exports = function(host, casper, xpath) {

	this.login = function(credentials) {
		casper.start(host).viewport(1920, 1080);

		casper.thenOpen(host + '/login', function() {
			this.echo("Authenticating...");

			this.test.assertExists('form#form-login-interno', 'form is found');

			this.fillXPath('form#form-login-interno', { 
				'//*[@id="example-text-input"]': credentials['username'], 
				'//*[@id="form-login-interno"]/div[3]/div/input': credentials['password']
			}, false);

			this.click(xpath('//*[@id="form-login-interno"]/div[4]/div/button'));
		});
	}

	this.list_courses = function() {
		casper.wait(10000, function() {
			var menuPath = xpath('//*[@class="dropdown hidden-sm-down"]/button/span[contains(text(), "Menu")]');
			this.test.assertExists(menuPath, 'Menu is found');

			this.click(menuPath);
		});
		
		casper.wait(10000, function(){
			var coursesPath = xpath('//*[@class="list-unstyled clearfix"]/li/a[@title="Cursos para Assinantes"]');
			this.test.assertExists(coursesPath, 'Courses link is found');

			this.click(coursesPath);
		});
	}

	this.list_courses_by_subject = function(subject) {
		casper.thenEvaluate(function(subject) {
				$('#selectMateria').val(subject).change();
			}, subject);
	}

	this.show_course = function(course) {
		casper.wait(10000, function() {
			this.click(xpath('/html/body/section/div[2]/div/ul/li/a/div/div/strong[contains(text(), "'+course+'")]'));
		});

		casper.wait(10000, function() {
			this.then(function() {

				var nodes = this.getElementsInfo('ul.list-group.list-group2.mt-3 li');
				this.each(nodes, function(casper, node, i) {
					var elements = node.html.toString().match(/"(\w*)"/);

					if (elements) {
						this.wait(500, function() {
							var mainId = elements[1];
							this.click(xpath('//*[@class="'+ node.attributes.class +'"]/div/a[@id="'+ mainId +'"]/../following-sibling::div[2]/a'));
						});
					}
				});
			});
		});

		casper.on('resource.received', function(resource) {
			var url = resource.url;

			// Check if resource is a video and avoid duplicates
			if (resource.id == 2 && !urls.hasOwnProperty(url)) {
				fs.write('urls.txt', url + "\r", 'a');
				urls[url] = true;
			}
		});
	}

	this.exit = function() {
		casper.run(function() {
    	this.echo('Done.').exit();
		});
	}
}