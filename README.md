This project has been created with the purpose of studying javascript and some of its tools.
The idea of this project has emerged as a need to get get videos from a website called www.euvoupassar.com.br. The website does not allow the user to download all videos at once, so you have to go through one by one which is a very boring process. The website consists of videos and documents grouped by subjects belonging to different courses.

In this sense I've decided to create a web crawler using the PhantomJS library and CasperJS on top of that. Since CasperJS does not support the download of large files I've had to store all the urls generated by the click event in a txt file. After generating the file I use wget to read it and dowload the videos.

The basic command to run the crawler is based on the deafult provided by PhantomJS with custom arguments. For example:

phatomjs crawler.js '<host>' '-username-' '-password-' '-subject-' '-course-'
