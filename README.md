This project has been created with the purpose of studying javascript and some of its tools.
The idea of this project has emerged of needing to get all class videos altogether from a website called www.euvoupassar.com.br. The website does not allow the user to download all the videos, so you have to download one by one which is a very boring process. This website consists of videos and documents grouped by subjects beloging to different courses.

In this sense I've decided to create a web crawler using the PhantomJS library and CasperJS on top of that. Since CasperJS does not support the download of large files I've had to get all the urls generated by the click event and store them in a txt file. After generating the file I use wget to read the file and dowload the videos.

The basic command to run the crawler is based on the deafult used by PhantomJS with additional parameters. For example:

phatomjs crawler.js '<host>' '-username-' '-password-' '-subject-' '-course-'
