.PHONY: run-java
run-java:
	cd ./java/target/classes && java SocketServer

.PHONY: run-node
run-node:
	npm start --prefix ./nodejs
