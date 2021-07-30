import * as vscode from 'vscode';
import { HttpBookApi } from './httpBookExtensionApi';
import { MonacoEditorHttpOutputProvider } from './monacoEditorHttpOutputProvider';


export function activate(): void {
  const httpbookExtension = vscode.extensions.getExtension<HttpBookApi>('anweber.httpbook');
  if (httpbookExtension?.isActive) {
    httpbookExtension.exports.registerHttpOutputProvider(new MonacoEditorHttpOutputProvider());
  }
}
