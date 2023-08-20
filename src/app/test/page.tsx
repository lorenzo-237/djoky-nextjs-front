import React from 'react';
import CategoryTable from '../../components/category/category-table';
import getAllCategories from '@/db/categories/fetch-categories';

export default async function Test() {
  const categories = await getAllCategories();

  return (
    <div>
      <CategoryTable categories={categories} />
    </div>
  );
}
