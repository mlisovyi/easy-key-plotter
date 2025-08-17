import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('easy-key-plotter.plotSelection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        
        if (!selectedText) {
            vscode.window.showErrorMessage('No text selected');
            return;
        }

        // Get configuration
        // const config = vscode.workspace.getConfiguration('easyKeyPlotter');
        // let pythonPath = config.get<string>('pythonPath', 'python');
        // // Resolve VSCode variables
        // pythonPath = resolveVariables(pythonPath);
        const pythonPath = await getPythonPath();
        // // Path to your Python script
        const pythonScript = path.join(context.extensionPath, 'src', 'plotter.py');
        
        // Execute Python script with selected text as argument
        const command = `"${pythonPath}" "${pythonScript}" "${selectedText.replace(/"/g, '\\"')}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (stdout) {
                vscode.window.showErrorMessage(`Error: ${stdout}`);
                return;
            }
            if (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                vscode.window.showErrorMessage(`Python Error: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage('Plot generated successfully!');
        });
    });

    context.subscriptions.push(disposable);
}

async function getPythonPath(): Promise<string> {
    try {
        const pythonExtension = vscode.extensions.getExtension('ms-python.python');
        if (pythonExtension) {
            if (!pythonExtension.isActive) {
                await pythonExtension.activate();
            }
            
            const pythonPath = pythonExtension.exports.settings.getExecutionDetails?.().execCommand?.[0];
            if (pythonPath) {
                return pythonPath;
            }
        }
    } catch (error) {
        console.log('Could not get Python path from extension:', error);
    }
    
    // Fallback to  default
    return "python"
}
