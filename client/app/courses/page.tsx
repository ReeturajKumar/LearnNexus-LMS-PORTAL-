import { Suspense } from 'react';
import CoursesClientPage from './CoursesClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesClientPage />
    </Suspense>
  );
}
