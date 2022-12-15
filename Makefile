.PHONY: install build link
all: setup

setup: install build link

install:
	@echo "Installing gh-labels dependencies"
	yarn install

build:
	@echo "Building gh-labels"
	yarn build

link:
	@echo "Linking gh-labels"
	yarn link
