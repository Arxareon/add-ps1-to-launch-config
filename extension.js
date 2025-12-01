// @ts-check

import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import { parse, modify, applyEdits } from 'jsonc-parser';

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	let disposable = vscode.commands.registerCommand(
		'add-ps1-to-launch-config.addToLaunchConfig',
		async (uri) => {
			if (!uri || !uri.fsPath.endsWith('.ps1')) {
				vscode.window.showErrorMessage('Please select a PowerShell script (.ps1) file.');
				return;
			}

			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			if (!workspaceFolder) {
				vscode.window.showErrorMessage('No workspace folder found.');
				return;
			}

			const vscodeDir = path.join(workspaceFolder.uri.fsPath, '.vscode');
			const launchPath = path.join(vscodeDir, 'launch.json');

			if (!fs.existsSync(vscodeDir)) {
				fs.mkdirSync(vscodeDir);
			}

			let content = '';
			let launchConfig = { version: '0.2.0', configurations: [] };
			let validJson = false;

			if (fs.existsSync(launchPath)) {
				content = fs.readFileSync(launchPath, 'utf8');

				const errors = [];
				const parsed = parse(content, errors, { allowTrailingComma: true, disallowComments: false });

				if (errors.length === 0 && parsed && typeof parsed === 'object') {
					launchConfig = parsed;
					if (!Array.isArray(launchConfig.configurations)) {
						launchConfig.configurations = [];
					}
					validJson = true;
				} else {
					const choice = await vscode.window.showWarningMessage(
						'Parsing of launch.json has failed — the file is invalid or corrupted.\n\nReplace launch.json with a clean configuration?',
						{ modal: true },
						'Remake launch.json',
						'Open launch.json'
					);

					if (choice === 'Remake launch.json') {
						launchConfig = { version: '0.2.0', configurations: [] };
						content = JSON.stringify(launchConfig, null, "\t");
						validJson = true;
					} else if (choice === 'Open launch.json') {
						const doc = await vscode.workspace.openTextDocument(launchPath);
						await vscode.window.showTextDocument(doc);
						return;
					} else {
						return;
					}
				}
			} else {
				content = JSON.stringify(launchConfig, null, "\t");
				validJson = true;
			}

			const relativeScriptPath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
			const normalizedPath = relativeScriptPath.replace(/\\/g, "/").toLowerCase();

			const newConfig = {
				type: 'PowerShell',
				request: 'launch',
				name: path.basename(uri.fsPath),
				script: "${workspaceFolder}/" + normalizedPath
			};

			const exists = launchConfig.configurations?.some(
				(cfg) =>
					cfg.type === newConfig.type &&
					cfg.request === newConfig.request &&
					(typeof cfg.script === 'string') &&
					cfg.script.toLowerCase() === newConfig.script.toLowerCase()
			);

			if (exists) {
				vscode.window.showInformationMessage(`Launch configuration for ${normalizedPath} already exists.`);
				return;
			}

			let updated;
			if (validJson) {
				const edits = modify(
					content,
					['configurations', -1],
					newConfig,
					{ formattingOptions: { insertSpaces: false, tabSize: 1 } }
				);
				updated = applyEdits(content, edits);
			} else {
				launchConfig.configurations.push(newConfig);
				updated = JSON.stringify(launchConfig, null, "\t");
			}

			fs.writeFileSync(launchPath, updated, 'utf8');
			vscode.window.showInformationMessage(`Added ${normalizedPath} to launch.json`);
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() { }