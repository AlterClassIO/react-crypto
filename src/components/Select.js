import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const Select = ({
  options = [],
  initialOption = null,
  onSelect = () => null,
}) => {
  const [selected, setSelected] = useState(initialOption || options?.[0]);

  const handleOnSelect = option => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <Listbox value={selected} onChange={handleOnSelect}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-8 text-left bg-gray-100 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm">
          <span className="block truncate font-medium">{selected}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute left-1/2 transform -translate-x-1/2 min-w-max w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options?.map(option => (
              <Listbox.Option
                key={option}
                className={({ active }) =>
                  `${
                    active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'
                  } cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="text-blue-600 absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
