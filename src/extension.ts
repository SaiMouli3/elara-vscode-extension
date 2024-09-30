// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { OpenAI } from "openai";  // Import OpenAI API

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Function to fetch response from OpenAI
	async function fetchResponse(prompt: string) {
		const openai = new OpenAI({
		  apiKey: process.env.OPENAI_API_KEY,
		});
	
		try {
			const completion = await openai.completions.create({
				model: "text-davinci-003",
				prompt: prompt,
				max_tokens: 150
			});
			return completion.choices[0].text.trim();
		} catch (error) {
			console.error('Error calling OpenAI API:', error);
			return "Failed to fetch response.";
		}
	}
	

	// Register the OpenAI query command
	let disposableQuery = vscode.commands.registerCommand('extension.openaiQuery', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = editor.document.getText(editor.selection);  // Get selected text
			const response = await fetchResponse(text);              // Fetch response from OpenAI
			vscode.window.showInformationMessage(response);          // Show response in VS Code
		}
	});
	context.subscriptions.push(disposableQuery);  // Register the command

	// Log the extension activation
	console.log('Congratulations, your extension "Elara" is now active!');

	// Register the "Hello World" command from package.json
	let disposableHello = vscode.commands.registerCommand('Elara.helloWorld', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Elara!');
	});

	context.subscriptions.push(disposableHello);
}

// This method is called when your extension is deactivated
export function deactivate() {}
