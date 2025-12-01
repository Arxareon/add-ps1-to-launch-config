# Add PS1 to Launch Configuration

A simple utility to add an entry for a PowerShell script to Launch Configuration via its right‑click menu.

## Usage
- Right‑click a `.ps1` file in the Explorer tree of an opened project or in the editor view, and choose `Add to Launch Configuration`
- A PowerShell launch entry will be added for the specific script to `.vscode/launch.json`: `"configurations": []`
- Select the script entry in the RUN AND DEBUG menu to launch it

## Requirements
- Visual Studio Code v1.80.0+
- *[PowerShell extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) to launch the script*

## License
MIT © Arxareon