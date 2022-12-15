# Overview

`gh-labels` is a small CLI tool that supports GitHub labels manipulation.

It is based on the official [GitHub API documentation](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#about-the-labels-api).

The key features of `gh-labels` are the following:

-   ✅ Supports creating new labels
-   ✅ Supports updating existing labels
-   ✅ Supports deleting labels
-   ✅ Supports setting labels based on a configuration file (see below)

# Usage Example

```bash
Usage: gh-labels [options] [command]

A small CLI tool for managing GitHub labels

Options:
  -V, --version        output the version number
  -o, --owner <owner>  The account owner of the repository. The name is not case sensitive
  -r, --repo <repo>    The name of the repository. The name is not case sensitive
  -t, --token <token>  The access token provided by GitHub
  -h, --help           display help for command

Commands:
  create [options]     creates a new label using the provided params
  get [options]        fetches a label from the repository
  get-all [options]    fetches all labels from the repository
  update [options]     updates an existing label using the provided params
  delete <labels...>   deletes labels using the provided list
  set <path>           sets the labels using the provided list. Removes missing (config) labels, adds new (config) ones, and updates existing labels
  help [command]       display help for command
```

To use the tool, the user needs to provide a couple of required parameters, namely:

-   the owner of the repository whose labels are being modified
-   the repo name
-   the GitHub access token

To fetch all labels from a repo, on the organization (user) account, the user can run the
following:

```bash
gh-labels -o <repoOwner> -r <repoName> -t <githubToken> create -n "New label" -c 7057ff -d "My helpful description"
```

![Banner](.github/demo.gif)

# Labels Config

Users can provide their own label config JSON that the tool can use to automatically manage the labels on a repository.
The format of the config JSON file is:

```json
[
    {
        "name": "Label name",
        "color": "HEX color, without the #",
        "description": "Label description, in max 100 characters"
    }
]
```

To use the custom label config file, simply specify it to the `set` command:

```bash
gh-labels -o <repoOwner> -r <repoName> -t <githubToken> set ./customList.json
```
