import * as assert from 'assert';
import { OpenAI } from "openai";

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

import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
