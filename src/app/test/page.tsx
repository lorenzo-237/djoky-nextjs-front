import React from 'react';
import CategoryTable from '../manage/components/category/CategoryTable';
import getAllCategories from '@/db/getAllCategories';

export default async function Test() {
  const categories = await getAllCategories();

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
}
