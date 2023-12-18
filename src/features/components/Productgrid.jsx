import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import RecipeReviewCard from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../product/productSlice";
import Progress from "./Progress";
import Paginationcomp from "./Pagination";
import { useState } from 'react';
import { Fragment} from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { fetchProductsByFiltersAsync } from "../product/productSlice";

const sortOptions = [

  { name: 'Best Rating', sort: 'rating', order:'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order:'asc' ,current: false },
  { name: 'Price: High to Low', sort: 'price',order:'desc' , current: false },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [ { value: 'smartphones', label: 'smartphones', checked: false },
    { value: 'laptops', label: 'laptops', checked: false },
    { value: 'fragrances', label: 'fragrances', checked: false },
    { value: 'skincare', label: 'skincare', checked: false },
    { value: 'groceries', label: 'groceries', checked: false },
    { value: 'home-decoration',
      label: 'home decoration',
      checked: false } ]
  },
  {
    id: 'brand',
    name: 'brands',
    options: [ { value: 'Apple', label: 'Apple', checked: false },
    { value: 'Samsung', label: 'Samsung', checked: false },
    { value: 'OPPO', label: 'OPPO', checked: false },
    { value: 'Huawei', label: 'Huawei', checked: false },
    { value: 'Microsoft Surface',
      label: 'Microsoft Surface',
      checked: false },
    { value: 'Infinix', label: 'Infinix', checked: false },
    { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
    { value: 'Impression of Acqua Di Gio',
      label: 'Impression of Acqua Di Gio',
      checked: false },
    { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
    { value: 'Fog Scent Xpressio',
      label: 'Fog Scent Xpressio',
      checked: false },
    { value: 'Al Munakh', label: 'Al Munakh', checked: false },
    { value: 'Lord - Al-Rehab',
      label: 'Lord   Al Rehab',
      checked: false },
    { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
    { value: 'Dermive', label: 'Dermive', checked: false },
    { value: 'ROREC White Rice',
      label: 'ROREC White Rice',
      checked: false },
    { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
    { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
    { value: 'Bake Parlor Big',
      label: 'Bake Parlor Big',
      checked: false },
    { value: 'Baking Food Items',
      label: 'Baking Food Items',
      checked: false },
    { value: 'fauji', label: 'fauji', checked: false },
    { value: 'Dry Rose', label: 'Dry Rose', checked: false },
    { value: 'Boho Decor', label: 'Boho Decor', checked: false },
    { value: 'Flying Wooden',
      label: 'Flying Wooden',
      checked: false },
    { value: 'LED Lights', label: 'LED Lights', checked: false },
    { value: 'luxury palace',
      label: 'luxury palace',
      checked: false },
    { value: 'Golden', label: 'Golden', checked: false } ]
  },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Productgrid() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const allproducts = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [filter,setFilter] = useState({});


  const itemsPerPage = 6; // Adjust the number of items per page as needed
  const [currentPage, setCurrentPage] = useState(1); 

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current page of products
  const currentProducts = allproducts.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handleFilter = (e,section, option)=>{
    const newFilter = {...filter, [section.id]:option.value}; 
    setFilter(newFilter);
    dispatch(fetchProductsByFiltersAsync(newFilter))
    console.log(section.id, option.value)

  }

  const handleSort = (e,option)=>{
    const newFilter = {...filter,_sort: option.sort, _order:option.order}; 
    setFilter(newFilter);
    dispatch(fetchProductsByFiltersAsync(newFilter))
   

  }

  return (
    <>
 <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                  

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
               
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={ e=> handleFilter(e,section,option)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                
                   {/* Products here  */}
      {allproducts ? (
        <Box sx={{ width: "100%", padding: "2rem" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {currentProducts.map((data) => (
              <Grid item xs={3} key={data.id}>
                <RecipeReviewCard
                  title={data.title}
                  price={data.price}
                  description={data.description}
                  thumbnail={data.thumbnail}
                />
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-end">
            <Paginationcomp
              allproducts={allproducts}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </Box>
      ) : (
        <Progress />
      )}
                
                </div>
            </div>
          </section>
        </main>
      </div>
    </div>

 
    </>
  );
}