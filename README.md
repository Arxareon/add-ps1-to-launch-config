# <img src="https://github.com/Arxareon/add-ps1-to-launch-config/blob/main/assets/logo.png" alt="Movement Speed Logo" width="40" height="40" align="top"> Add PS1 to Launch Configuration
[![GitHub Sponsor](https://img.shields.io/static/v1?label=GitHub&nbsp;Sponsor&message=%E2%9D%A4&color=EA4AAA&style=for-the-badge&logo=GitHub)](https://github.com/sponsors/Arxareon)
[![PayPal Donation](https://img.shields.io/static/v1?label=PayPal&nbsp;Donation&message=%E2%9D%A4&&color=0F9CD8&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuNDUiIGQ9Ik0xNi4xMyAzOS4xMTVIOC4zNjdhMS4wNDEgMS4wNDEgMCAwIDEtMS4wMjYtMS4ybDUuMjM0LTMzLjE3NmExLjI3OSAxLjI3OSAwIDAgMSAxLjI2MS0xLjA3OWgxMy4zMzVjNi4zMTUgMCAxMC45MDkgNC41OTIgMTAuOCAxMC4xNTcgMy43MzUgMS45NSA1LjkxNSA1LjkxIDUuMjM0IDEwLjI0N2ExMi41NDggMTIuNTQ4IDAgMCAxLTEyLjM5IDEwLjYySDI2Ljg5YTEuMjc1IDEuMjc1IDAgMCAwLTEuMjYxIDEuMDhMMjMuODcgNDYuOWExLjI3NiAxLjI3NiAwIDAgMS0xLjI2MiAxLjA3OUgxNS45NGExLjA0IDEuMDQgMCAwIDEtMS4wMjYtMS4xOTlsMS4yMTUtNy42NjR2LS4wMDJaIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuNDUiIGQ9Ik0zNy45NzMgMTMuODE3YTExLjY2OCAxMS42NjggMCAwIDAtNS40NDEtMS4yOTRIMjEuNDE0YTEuMjc3IDEuMjc3IDAgMCAwLTEuMjYxIDEuMDhsLTIuMDk4IDEzLjI5My4wMDYtLjAzNWExLjI4IDEuMjggMCAwIDEgMS4yNTYtMS4wNDJoNi4xNDRhMTIuNTUzIDEyLjU1MyAwIDAgMCAxMi4zOS0xMC42MmMuMDcxLS40NTcuMTEzLS45Mi4xMjItMS4zODJaIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE2LjEzMyAzOS4xMTVIOC4zNjhhMS4wNDEgMS4wNDEgMCAwIDEtMS4wMjYtMS4ybDUuMjM0LTMzLjE3NmExLjI3OSAxLjI3OSAwIDAgMSAxLjI2MS0xLjA3OWgxMy4zMzVjNi4zMTUgMCAxMC45MDkgNC41OTIgMTAuODAxIDEwLjE1N2ExMS42NyAxMS42NyAwIDAgMC01LjQ0MS0xLjI5NEgyMS40MTRhMS4yNzcgMS4yNzcgMCAwIDAtMS4yNjEgMS4wOGwtMi4wOTggMTMuMjkzLjAwNi0uMDM1LTEuOTI4IDEyLjI1NFoiLz4KPC9zdmc+Cg==)](https://paypal.me/Arxareon)

A simple utility to add an entry for a PowerShell script to Launch Configuration via its right‑click menu.

## Usage
- Right‑click a `.ps1` file in the Explorer tree of an opened project or in the editor view, and choose `Add to Launch Configuration`
- A PowerShell launch entry will be added for the specific script to `.vscode/launch.json`: `"configurations": []`
- Select the script entry in the RUN AND DEBUG menu to launch it

## Requirements
- Visual Studio Code v1.80.0+
- *[PowerShell extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) to launch the script*

## Support
This extension is free and open source. If you find it helpful, consider supporting via the buttons above. 💜

## License
MIT © Arxareon
