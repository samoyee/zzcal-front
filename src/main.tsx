import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

const userAgent = window.navigator.userAgent;
const app = ReactDOM.createRoot(document.getElementById('root')!)
if (userAgent.includes('iPhone OS') || userAgent.includes('Android')) {
  document.body.classList.add("mobile")
  const App = lazy(() => import('@/app/app'));
  app.render(<Suspense><App /></Suspense>)
} else {
  const PC = lazy(() => import('@/pc/app'));
  app.render(<Suspense><PC /></Suspense>)
}
