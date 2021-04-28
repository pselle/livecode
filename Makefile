web:
	node scripts/generate.js

list:
	node scripts/songlist.js

add:
	git add songindex.txt songs/
	git commit -m "New song"
	git push origin master
