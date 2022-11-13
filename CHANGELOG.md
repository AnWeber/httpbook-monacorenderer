## 2.0.2 (2022-11-13)

- update Monaco-Editor
- update mimetypes

## 2.0.1 (2022-01-27)

- update Monaco-Editor

## 2.0.0 (2021-11-21)

- use built-in mimetypes to allow Renderer only Extension (vscode.dev support)

## 1.1.0 (2021-09-26)

- update to monaco editor 0.28.1
- fix missing icons

## 1.0.0 (2021-07-30)

#### Features

- Monaco editor pulled out of httpbook because of Anweber/httpbook#27
- Monaco Editor should solve same small problems in vscode. once these are fixed, the extension will be deprecated

  - Missing search in output (Search text in output cell microsoft/vscode#128665, Notebook: find doesn't search in output microsoft/vscode#94239)
  - no pretty print of output (solvable in extension)
  - horizontal scrolling issue (Horizontal scrolling in output cells microsoft/vscode#110825)
  - broken renderer issue with css
  - broken height of output cells (Native Notebooks - Support Output Preview or Resizable Outputs microsoft/vscode#126863,
  - Built-in application/json notebook renderer output container height truncates output microsoft/vscode#128391)
