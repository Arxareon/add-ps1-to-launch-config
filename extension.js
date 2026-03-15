// @ts-check

import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import { parse, modify, applyEdits } from 'jsonc-parser';

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	let disposable = vscode.commands.registerCommand('add-ps1-to-launch-config.addToLaunchConfig', async (uri) => {
		if (!uri || !uri.fsPath.endsWith('.ps1')) {
			vscode.window.showErrorMessage('Please select a PowerShell script (.ps1) file.');

			return;
		}

		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			vscode.window.showErrorMessage('No workspace folder found.');

			return;
		}

		const workspaceFile = vscode.workspace.workspaceFile;

		let targetPath;
		let pointer;

		if (workspaceFile) {
			targetPath = workspaceFile.fsPath;
			pointer = ['launch', 'configurations'];
		} else {
			const vscodeDir = path.join(workspaceFolder.uri.fsPath, '.vscode');
			const launchPath = path.join(vscodeDir, 'launch.json');

			if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir);

			targetPath = launchPath;
			pointer = ['configurations'];
		}

		let content = '';
		/** @type {any} */
		let root = {};
		let validJson = false;

		if (fs.existsSync(targetPath)) {
			content = fs.readFileSync(targetPath, 'utf8');

			const errors = [];
			const parsed = parse(content, errors, { allowTrailingComma: true, disallowComments: false });

			if (errors.length === 0 && parsed && typeof parsed === 'object') {
				root = parsed;

				if (workspaceFile) {
					if (!root.launch) root.launch = { version: '0.2.0', configurations: [] };
					if (!Array.isArray(root.launch.configurations)) root.launch.configurations = [];
				} else if (!Array.isArray(root.configurations)) root.configurations = [];

				validJson = true;
			} else {
				const choice = await vscode.window.showWarningMessage(`Parsing of ${path.basename(targetPath)} has failed — the file is invalid or corrupted.\n\nReplace it with a clean configuration?`, { modal: true }, 'Remake file', 'Open file');

				if (choice === 'Remake file') {
					root = workspaceFile ? {
						folders: root.folders ?? [{ path: '.' }],
						launch: { version: '0.2.0', configurations: [] }
					} : { version: '0.2.0', configurations: [] };
					content = JSON.stringify(root, null, "\t");
					validJson = true;
				} else if (choice === 'Open file') {
					const doc = await vscode.workspace.openTextDocument(targetPath);

					await vscode.window.showTextDocument(doc);

					return;
				} else return;
			}
		} else {
			root = workspaceFile ? { folders: [{ path: '.' }], launch: { version: '0.2.0', configurations: [] } } : { version: '0.2.0', configurations: [] };

			content = JSON.stringify(root, null, "\t");
			validJson = true;
		}

		/** @type {any[]} */
		const configs = workspaceFile ? root.launch.configurations : root.configurations;

		const relativeScriptPath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
		const normalizedPath = relativeScriptPath.replace(/\\/g, "/");

		const newConfig = {
			type: 'PowerShell',
			request: 'launch',
			name: path.basename(uri.fsPath),
			script: "${workspaceFolder}/" + normalizedPath
		};

		const exists = configs?.some(
			(cfg) => cfg.type === newConfig.type && cfg.request === newConfig.request && (typeof cfg.script === 'string') && cfg.script.toLowerCase() === newConfig.script.toLowerCase()
		);

		if (exists) {
			vscode.window.showInformationMessage(`Launch configuration for ${normalizedPath} already exists.`);

			return;
		}

		let updated;
		if (validJson) {
			const edits = modify(content, [...pointer, -1], newConfig, { formattingOptions: { insertSpaces: false, tabSize: 1 } });
			updated = applyEdits(content, edits);
		} else {
			configs.push(newConfig);
			updated = JSON.stringify(root, null, "\t");
		}

		fs.writeFileSync(targetPath, updated, 'utf8');
		vscode.window.showInformationMessage(`Added ${normalizedPath} to ${path.basename(targetPath)}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }