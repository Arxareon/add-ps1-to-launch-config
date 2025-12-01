# Contributing to *Add PS1 to Launch Configuration*

## Setup
1. Clone the repository:
```
git clone https://github.com/Arxareon/add-ps1-to-launch-config
```

2. Install dependencies
```
cd add-ps1-to-launch-config
npm install
```

## Build
1. Package the extension (in the local directory):

```
vsce package
```

2. Install the `.vsix` locally:

```
code --install-extension add-ps1-to-launch-config-1.0.0.vsix
```