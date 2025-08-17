import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('easy-key-plotter.plotSelection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) return;

        const config = vscode.workspace.getConfiguration('easyKeyPlotter');
        const pythonCode = config.get<string>('pythonCode', '');
        console.log(`Using Python code: ${pythonCode.trim()}`);
        const fullPythonCode = `SELECTION = ${selectedText}\n${pythonCode}`;
        console.log(fullPythonCode);

        // Send to Python Interactive window
        await vscode.commands.executeCommand('jupyter.execSelectionInteractive', fullPythonCode);
    });

    context.subscriptions.push(disposable);
}