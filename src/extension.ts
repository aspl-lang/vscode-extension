import * as vscode from 'vscode';
import { window, Terminal } from 'vscode';

let terminal: Terminal | null = null;

export function execute(args: string[]): void {
  const cmd = `aspl ${args.join(" ")}`;

  if (!terminal) terminal = window.createTerminal("ASPL");

  terminal.show();
  terminal.sendText(cmd);
}

export function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand("aspl.version", () => {
    execute(['version']);
  }));
  context.subscriptions.push(vscode.commands.registerCommand("aspl.run_workspace", () => {
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      execute(['run', '"' + vscode.workspace.workspaceFolders[0].uri.fsPath + '"']);
    } else {
      vscode.window.showErrorMessage('No workspace folder is open!');
    }
  }));
  context.subscriptions.push(vscode.commands.registerCommand("aspl.compile_workspace", () => {
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      execute(['compile', '"' + vscode.workspace.workspaceFolders[0].uri.fsPath + '"']);
    } else {
      vscode.window.showErrorMessage('No workspace folder is open!');
    }
  }));
}