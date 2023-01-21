"use client";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

import { Fragment, useState, useEffect } from "react";
import { FiCommand } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";

export default function SearchModal() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const [searhing, setSearching] = useState(false);
  const [query, setQuery] = useState("");
const [data, setData] = useState([]);
  useEffect(() => {
    if (query.length >= 3) {
      setSearching(true);
      axios(
        "https://encouraging-bat-sun-hat.cyclic.app/api/anime/oploverz/search?q=" +
          query
      ).then((res) => {
        const data = res.data;
        console.log(data);
        setData(data);
        setSearching(false);
      });
    } else {
      setQuery("");
      setData([]);
    }
  }, [query]);
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      closeModal();
      router.push(`/search?q=${event.target.value}`);
      setQuery("");
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="lg:hidden focus:outline-none px-3 py-2 dark:bg-slate-700/90 bg-white border border-slate-400 dark:border-slate-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600"
      >
        <HiOutlineSearch size={20} />
      </button>
      <div className="hidden lg:block">
        <button
          type="button"
          onClick={openModal}
          className="px-2 py-2 focus:outline-none hover:bg-slate-100 dark:bg-slate-700/90 dark:hover:bg-slate-600 border border-slate-400 dark:border-slate-500 text-sm rounded-md dark:text-slate-400 flex items-center gap-x-2"
        >
          <span>
            <HiOutlineSearch size={18} />
          </span>
          <span>Pencarian Cepat...</span>
          <span className="flex items-center gap-x-1">
            <FiCommand size={13} />K
          </span>
        </button>
      </div>
      
      
      <Transition
    appear
    show={isOpen}
    as={Fragment}
    afterLeave={() => {
     setQuery("");
    }}
   >
    <Dialog
     onClose={setIsOpen}
     className="fixed inset-0 overflow-y-auto p-4 pt-4"
    >
     <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
     >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
     </Transition.Child>
     <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
     >
      <Combobox
       onChange={(value) => {
        setIsOpen(false);
        router.push(`/anime/${value}`);
        // router.push(`/search/${value}`);
       }}
       as="div"
       className="w-full border dark:bg-slate-800 dark:border-slate-700 dark:divide-slate-700 divide-y  max-w-2xl transform overflow-hidden rounded-lg bg-white border-slate-400 text-left align-middle lg:mt-6 shadow-xl transition-all"
      >
       <div className="flex items-center px-4">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5 dark:text-slate-200 text-slate-600"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         stroke="currentColor"
         fill="none"
        >
         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
         <circle cx="10" cy="10" r="7"></circle>
         <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
        <Combobox.Input
         onChange={(e) => {
          setQuery(e.target.value);
         }}
         onKeyDown={handleSearch}
         className="px-2 w-full border-0 bg-transparent dark:text-slate-100 focus:outline-none focus:ring-0 text-sm placeholder-slate-400 text-slate-600 h-12"
         placeholder="search"
        />
        
        {searhing &&
        <div aria-label="Loading..." role="status">
         <svg
          class="h-6 w-6 animate-spin stroke-gray-500"
          viewBox="0 0 256 256"
         >
          <line
           x1="128"
           y1="32"
           x2="128"
           y2="64"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="195.9"
           y1="60.1"
           x2="173.3"
           y2="82.7"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="224"
           y1="128"
           x2="192"
           y2="128"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="195.9"
           y1="195.9"
           x2="173.3"
           y2="173.3"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="128"
           y1="224"
           x2="128"
           y2="192"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="60.1"
           y1="195.9"
           x2="82.7"
           y2="173.3"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="32"
           y1="128"
           x2="64"
           y2="128"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
          <line
           x1="60.1"
           y1="60.1"
           x2="82.7"
           y2="82.7"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="24"
          ></line>
         </svg>
        </div>
        }
        
       </div>
       <Combobox.Options className="max-h-96 overflow-y-auto texts-sm text-slate-700 dark:text-slate-300">
        {data.length > 0 &&
         data.results.map((item, i) => (
          <Combobox.Option key={i} value={item.id}>
           {({ active }) => (
            <div
             className={`px-4 py-2 ${
              active
               ? "text-slate-800 dark:text-slate-100 bg-slate-200 dark:bg-slate-900"
               : ""
             }`}
            >
             {" "}
             {item.title}{" "}
            </div>
           )}
          </Combobox.Option>
         ))}
       </Combobox.Options>

       <div className="px-4 h-8 bg-slate-50 dark:bg-slate-900/30 items-center text-slate-500 dark:text-slate-400 flex gap-x-4 justify-between text-[12px] font-medium">
        Enter
       </div>
      </Combobox>
     </Transition.Child>
    </Dialog>
   </Transition>


{/*
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full border dark:bg-slate-800 dark:border-slate-700 dark:divide-slate-700 divide-y  max-w-2xl transform overflow-hidden rounded-lg bg-white border-slate-400 text-left align-middle lg:mt-6 shadow-xl transition-all">
                  <div className="flex items-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 dark:text-slate-200"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      clastrokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      ststrokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="10" cy="10" r="7"></circle>
                      <line x1="21" y1="21" x2="15" y2="15"></line>
                    </svg>
                    <input
                      className="px-2 w-full border-0 bg-transparent dark:text-slate-100 focus:outline-none focus:ring-0 text-sm placeholder-slate-400 text-slate-600 h-12"
                      placeholder="Pencarian cepat..."
                      value={searchValue}
                      onKeyDown={handleSearch}
                      onChange={(event) => {
                        setSearchValue(event.target.value);
                      }}
                      type="text"
                      ariaExpanded="false"
                      tabindex="0"
                    ></input>
                  </div>
                  <div className="px-4 h-8 bg-slate-50 dark:bg-slate-900/30 items-center text-slate-500 dark:text-slate-400 flex gap-x-4 justify-between text-[12px] font-medium">
                    Enter
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      */}
    </>
  );
}
