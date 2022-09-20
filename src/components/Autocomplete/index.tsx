import { createRef, useCallback, useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import Dropdown from "./Dropdown";

import { fetchCountries } from "../../services/countries";
import { debounce } from "../../utils/debounce";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { Country, ListItemRefs } from "./types";

const AutoComplete = () => {
  const [value, setValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const refs: ListItemRefs = suggestions.reduce((acc: ListItemRefs, value, currentIndex) => {
    acc[currentIndex] = createRef();
    return acc;
  }, {});
  useOnClickOutside(autocompleteRef, () => setShowSuggestions(false));
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setValue(event.target.value);
    debouncedCountries(event.target.value);
    setShowSuggestions(true);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCountries = useCallback(debounce( async (value: string) => {
    if(value) {
      const data = await fetchCountries(value);
      setSuggestions(data);
      setIsLoading(false);
    }
  }, 500), []);

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if((e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
      refs?.[activeIndex]?.current?.scrollIntoView({
        block: e.code === 'ArrowUp' ? 'end' : 'start'
      });
    }
    if (e.code === 'Enter') {
      setActiveIndex(0);
      setShowSuggestions(false);
      setValue(suggestions[activeIndex].name);
    }
    else if (e.code === 'Escape') {
      setShowSuggestions(false);
    }
    else if (e.code === 'ArrowUp') {
      return (activeIndex === 0) ? setActiveIndex(suggestions.length - 1) : setActiveIndex(activeIndex - 1);
    }
    else if (e.code === 'ArrowDown') {
      return (activeIndex === suggestions.length - 1) ? setActiveIndex(0) : setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="autocomplete" ref={autocompleteRef}>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Select your country"
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={onKeyDown}
      />
      {(value.length > 0 && showSuggestions) && (
        <ul className="autocomplete-list">
          <Dropdown
            value={value}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            activeIndex={activeIndex}
            refs={refs}
            isLoading={isLoading}
            noData={suggestions.length === 0}
          />
        </ul>
      )}

    </div>
  )
};

export default AutoComplete;