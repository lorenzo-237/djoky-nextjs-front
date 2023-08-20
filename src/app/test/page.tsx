import React from 'react';
import CategoryTable from '../../components/category/CategoryTable';
import getAllCategories from '@/db/fetch-categories';

export default async function Test() {
  const categories = await getAllCategories();

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
}
