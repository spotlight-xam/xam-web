export default {
  title: "리액트 개발 환경 준비(npm.version)",
  text: `
## npm

npm은 'Node.js'라 불리는 별도의 실행 환경에서 동작합니다.
node 명령을 이용하여 버전을 확인할 수 있습니다: \`node -v\`

## 새 디렉터리 만들기와 npm을 이용한 프로젝트 초기화

- \`npx create-react-app react-for-beginner\`: 프로젝트 생성
- 프로젝트 중복 생성시: \`npm uninstall -g create-react-app\` (파일 제거)

건들면 안되는 파일들:

- src/App.css
- src/App.test.js
- src/logo.svg
- public/index.html → 페이지 템플릿
- src/index.js → 자바스크립트 시작점

## 기본 디렉토리 생성

- src/components: 컴포넌트들이 위치하는 디렉토리
- src/pages: 각 라우터들이 위치하는 디렉토리
- src/client: 브라우저 측에서 사용할 최상위 컴포넌트

## React-Router-dom

리액트를 사용할 때 페이지를 이동할 때 필요한 라이브러리인 \`react-router-dom\`을 설치합니다.

- 설치 명령: \`npm install react-router-dom\`

Root 컴포넌트 생성:

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`\`\`

App.js 수정:

\`\`\`jsx
import Layout from "./Layout";
import Home from "./routes/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
\`\`\`

## TypeScript

TypeScript 설치:

- \`npm install typescript\`
- \`npm install -D typescript @types/node @types/react @types/react-dom @types/jest\`

tsconfig.json 생성 및 세부 옵션 설정:

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "preserve",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## react-query

react-query 설치:

- \`npm install @tanstack/react-query\`
`,
  contents: `
## npm

npm은 'Node.js'라 불리는 별도의 실행 환경에서 동작합니다.
node 명령을 이용하여 버전을 확인할 수 있습니다: \`node -v\`

## 새 디렉터리 만들기와 npm을 이용한 프로젝트 초기화

- \`npx create-react-app react-for-beginner\`: 프로젝트 생성
- 프로젝트 중복 생성시: \`npm uninstall -g create-react-app\` (파일 제거)

건들면 안되는 파일들:

- src/App.css
- src/App.test.js
- src/logo.svg
- public/index.html → 페이지 템플릿
- src/index.js → 자바스크립트 시작점

## 기본 디렉토리 생성

- src/components: 컴포넌트들이 위치하는 디렉토리
- src/pages: 각 라우터들이 위치하는 디렉토리
- src/client: 브라우저 측에서 사용할 최상위 컴포넌트

## React-Router-dom

리액트를 사용할 때 페이지를 이동할 때 필요한 라이브러리인 \`react-router-dom\`을 설치합니다.

- 설치 명령: \`npm install react-router-dom\`

Root 컴포넌트 생성:

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`\`\`

App.js 수정:

\`\`\`jsx
import Layout from "./Layout";
import Home from "./routes/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
\`\`\`

## TypeScript

TypeScript 설치:

- \`npm install typescript\`
- \`npm install -D typescript @types/node @types/react @types/react-dom @types/jest\`

tsconfig.json 생성 및 세부 옵션 설정:

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "preserve",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## react-query

react-query 설치:

- \`npm install @tanstack/react-query\`
  `,
  summary: `npm npm은 ‘Node.js’라 불리는 별도의 실행 환경에서 동작 node 명령을 이용한 버전 확인 : node -v 새 디렉터리 만들기와 npm을 이용한 프로젝트 초기화 - npx create-react-app react-for-beginner 프로젝트 중복 생성시 - npm uninstall -g create-react-app 파일 제거 src/App.css src/App.test.js src/logo.svg 건들면 안되는 파일들 public/index.html → 페이지 템플릿 src/index.js → 자바스크립트 시작점 기본 디렉토리 생성 src/components : 컴포넌트들이 위치하는 디렉토리 src/pages : 각 라우터들이 위치하는 디렉토리 src/client : 브라우저 측에서 ...`,
  createdAt: "2023. 3. 5. 01:45",
};
