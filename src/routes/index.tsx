import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/grand-lavash" element={<Home />} />
    </Routes>
  );
}

export default RoutesComponent;
