.PHONY: all install build test clean audit

all: install build test audit

install:
	npm install

build:
	npm run build

test:
	npm test

clean:
	npm run clean

audit:
	npm audit
