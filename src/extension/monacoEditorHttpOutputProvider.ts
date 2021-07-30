import type * as Httpyac from 'httpyac';
import * as vscode from 'vscode';
import { HttpOutputProvider, HttpOutputResult, HttpOutputPriority } from './httpBookExtensionApi';


export class MonacoEditorHttpOutputProvider implements HttpOutputProvider {
  id = 'httpbook-monacoeditor';


  getResponseOutputResult(response: Httpyac.HttpResponse): HttpOutputResult | false {
    let mimeType: string | undefined;
    if (response.contentType) {
      if (/^(application|text)\/(.*\+|x-amz-)?json.*$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/json';
      } else if (/^(application|text|image)\/(.*\+)?xml.*$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/xml';
      } else if (/^text\/css$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/css';
      } else if (/^text\/html$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/html';
      } else if (/^(application)\/(x-)?javascript$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/javascript';
      } else if (/^text\/markdown$/u.test(response.contentType.mimeType)) {
        mimeType = 'x-httpbookmonaco/markdown';
      } else if (response.contentType.mimeType.startsWith('text')) {
        mimeType = 'x-httpbookmonaco/plain';
      }
    }

    if (mimeType
      && response.body
      && typeof response.body === 'string'
      && response.body.length > 0) {
      return {
        outputItems: vscode.NotebookCellOutputItem.text(response.body, mimeType),
        priority: HttpOutputPriority.High,
      };
    }

    return false;
  }
}
