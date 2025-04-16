import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CoursesClientPage = dynamic(() => import('./CoursesClientPage'), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesClientPage />
    </Suspense>
  );
}
